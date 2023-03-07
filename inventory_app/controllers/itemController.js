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
            item: async () => Item.findById(req.params.id).populate('category').collation({ locale: "en" }).sort({ name: 1 }),
            categories: async () => Category.find({})
        });
        //on success render item detail page
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
                errors: [err]
            });
        }
        //on success render item create page
        res.render('item_form', {
            title: 'Inventory - Create New Item',
            categories: categories,
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

            // Create an Author object with escaped and trimmed data.
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
                    errors: errors.array(),
                });
                return;
            }

            //check if name already exists
            const nameUniqueCheck = await Item.findOne({ name: req.body.item_name});
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
                    errors: [err],
                });
            }

            //if no errors, save data
            await item.save();
            res.redirect(item.url);
        } catch (error) {
            //pass on any errors
            return next(error);
        }
    },
];