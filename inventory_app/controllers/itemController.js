const async = require('async');
const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Item = require('../models/item');

//render full list of items
exports.item_list = async (req, res, next) => {
    try {
        //get sort order value and validate it as 1 or -1 only, default is 1
        const sortVal = parseInt(req.query.sort);
        const validateSort = sortVal !== 1 ? (sortVal !== -1 ? 1 : sortVal) : sortVal;
        //get sort by value, default is 'name'
        const sortByVal = req.query.sortBy;
        const validateSortByVal = sortByVal === undefined ? 'name' : sortByVal;
        //query db for all items and sort
        const results = await Item.find({}).populate('category').collation({ locale: "en" }).sort({ [validateSortByVal]: validateSort });
        //on success render item list page
        res.render('item_list', {
            title: 'Inventory - All Items',
            item_list: results,
            sort: validateSort,
            sortBy: validateSortByVal
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//render item detail page
exports.item_detail = async (req, res, next) => {
    try {
        //query db for specific item and all categories
        const results = await async.parallel({
            item: async () => Item.findById(req.params.id).populate('category'),
            categories: async () => Category.find({})
        });
        //on success, check item was found
        if (results.item == null) {
            //if no item found, return error
            const err = new Error("Item not found");
            err.status = 404;
            return next(err);
        }
        //item found, render item detail page
        res.render('item_detail', {
            title: 'Inventory - Item Detail',
            item: results.item,
            categories: results.categories
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//render create item form
exports.item_create_get = async (req, res, next) => {
    try {
        //query db for all categories and sort
        const categories = await Category.find({}).collation({ locale: "en" }).sort({ name: 1 });
        if (categories == null) {
            //if no categories found, throw error as item requires a category
            let err = null;
            err = new Error('Categories not found');
            err.msg = 'No categories could be found, please add one before creating item';
            err.status = 404;
            //render item create page with error
            res.render('item_form', {
                title: 'Inventory - Create New Item',
                categories: categories,
                goToUrl: 'goToUrl("/items")',
                errors: [err]
            });
        }
        //on success render item create page
        res.render('item_form', {
            title: 'Inventory - Create New Item',
            select_category_id: req.params.category_id == 'undefined' ? '' : req.params.category_id, //if category parameter included, category will be selected on create form
            categories: categories,
            goToUrl: 'goToUrl("/items")'
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//handle create item on POST
exports.item_create_post = [
    body('item_name', 'Name is required.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('item_description', 'Description should be at least 3 characters long.')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body('item_category', 'Category is required.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('item_price', 'Price must be a number.')
        .trim()
        .isNumeric(),
        // .isDecimal({ decimal_digits: '2', locale: 'en-GB'}),
    body('item_qty', 'Qty in stock must be a whole number (greater or equal to 0) and is required.')
        .trim()
        .isInt({ gte: 0}),
    // Process request after validation and sanitization.
    async (req, res, next) => {
        try {
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            // Create an item object with escaped and trimmed data.
            const item = new Item({
                name: req.body.item_name,
                description:  req.body.item_description,
                category:  req.body.item_category,
                price:  parseFloat(req.body.item_price),
                qty: parseInt(req.body.item_qty)
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                const categories = await Category.find({}).collation({ locale: "en" }).sort({ name: 1 });
                res.render("item_form", {
                    title: "Inventory - Create New Item",
                    currItem: item,
                    categories: categories,
                    select_category_id: req.params.category_id == 'undefined' ? '' : req.params.category_id,
                    errors: errors.array(),
                });
            } else {
                //check if name already exists (case insensitive)
                const nameUniqueCheck = await Item.findOne({ name: { $regex : new RegExp(req.body.item_name, "i")} });
                if (nameUniqueCheck != null) {
                    //if item name already exists throw error
                    let err = null;
                    err = new Error('Item name already exists');
                    err.msg = 'Item name already exists, please choose a new one.';
                    err.status = 409;
                    //render item create page with error
                    const categories = await Category.find({}).collation({ locale: "en" }).sort({ name: 1 });
                    res.render("item_form", {
                        title: "Inventory - Create New Item",
                        currItem: item,
                        categories: categories,
                        select_category_id: req.params.category_id == 'undefined' ? '' : req.params.category_id,
                        errors: [err],
                    });
                } else {
                    //if no errors, save data
                    await item.save();
                    res.redirect(item.url);
                }
            }
        } catch (error) {
            //pass on any errors
            return next(error);
        }
    }
];

//render item delete page on GET.
exports.item_delete_get = async (req, res, next) => {
    try {
        //query db for specific item
        const item = await Item.findById(req.params.id);
        //on success, check item was found
        if (item == null) {
            //if no item found, return error
            const err = new Error("Item not found");
            err.status = 404;
            return next(err);
        }
        //on success render item delete page
        res.render('item_delete', {
            title: 'Inventory - Delete Item',
            item: item,
            goToUrl: `goToUrl("${item.url}")` //on cancel click go to item url
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

// Handle item delete on POST.
exports.item_delete_post = async (req, res, next) => {
    try {
        //query db for specific item
        const item = await Item.findById(req.params.id);
        //on success, check item was found
        if (item == null) {
            //if no item found, return error
            const err = new Error("Item not found");
            err.status = 404;
            return next(err);
        }
        //on success delete item from db
        await item.deleteOne({ _id: req.body.item_id });
        res.redirect('/items');
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//render item update form on GET.
exports.item_update_get = async (req, res, next) => {
    try {
        //query db for specific item and all categories
        const results = await async.parallel({
            item: async () => Item.findById(req.params.id).populate('category'),
            categories: async () => Category.find({})
        });
        //on success, check category was found
        if (results.item == null) {
            //if no item found, return error
            const err = new Error("Item not found");
            err.status = 404;
            return next(err);
        } else {
            res.render('item_form', {
                title: 'Inventory - Update Item',
                currItem: results.item,
                categories: results.categories,
                goToUrl: `goToUrl("${results.item.url}")`
            });
        }
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//handle item update form on POST.
exports.item_update_post = [
    body('item_name', 'Name is required.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('item_description', 'Description should be at least 3 characters long.')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body('item_category', 'Category is required.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('item_price', 'Price must be a number.')
        .trim()
        .isNumeric(),
        // .isDecimal({ decimal_digits: '2', locale: 'en-GB'}),
    body('item_qty', 'Qty in stock must be a whole number (greater or equal to 0) and is required.')
        .trim()
        .isInt({ gte: 0}),
    // Process request after validation and sanitization.
    async (req, res, next) => {
        try {
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            // Create an item object with escaped and trimmed data.
            const item = new Item({
                name: req.body.item_name,
                description:  req.body.item_description,
                category:  req.body.item_category,
                price:  parseFloat(req.body.item_price),
                qty: parseInt(req.body.item_qty),
                _id: req.params.id
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                const categories = await Category.find({}).collation({ locale: "en" }).sort({ name: 1 });
                res.render("item_form", {
                    title: "Inventory - Update Item",
                    currItem: item,
                    categories: categories,
                    select_category_id: req.params.category_id == 'undefined' ? '' : req.params.category_id,
                    goToUrl: `goToUrl("${item.url}")`,
                    errors: errors.array()
                });
            } else {
                //check if name already exists (case insensitive)
                const nameUniqueCheck = await Item.findOne({ name: { $regex : new RegExp(req.body.item_name, "i")}, _id: { $ne: req.params.id } });
                if (nameUniqueCheck != null) {
                    //if item name already exists throw error
                    let err = null;
                    err = new Error('Item name already exists');
                    err.msg = 'Item name already exists, please choose a new one.';
                    err.status = 409;
                    //render item create page with error
                    const categories = await Category.find({}).collation({ locale: "en" }).sort({ name: 1 });
                    res.render("item_form", {
                        title: "Inventory - Update Item",
                        currItem: item,
                        categories: categories,
                        select_category_id: req.params.category_id == 'undefined' ? '' : req.params.category_id,
                        goToUrl: `goToUrl("${item.url}")`,
                        errors: [err]
                    });
                } else {
                    //if no errors, update data
                    await Item.findByIdAndUpdate(req.params.id, item, {});
                    res.redirect(item.url);
                }
            }
        } catch (error) {
            //pass on any errors
            return next(error);
        }
    }
];