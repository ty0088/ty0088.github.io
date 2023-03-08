const async = require('async');
const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Item = require('../models/item');

//render full list of categories
exports.category_list = async (req, res, next) => {
    try {
        //get sort order value and validate it as 1 or -1 only, default is 1
        const sortVal = parseInt(req.query.sort);
        const validateSort = sortVal !== 1 ? (sortVal !== -1 ? 1 : sortVal) : sortVal;
        //query db for all items and all categories
        const results = await async.parallel({
            items: async () => Item.find({}),
            categories: async () => Category.find({}).collation({ locale: "en" }).sort({ name: validateSort })
        });
        //on success count the amount of unique items and total stock qty in each category and return an object with values
        let itemCounts = {};
        let stockCounts = {};
        results.categories.forEach(category => {
            itemCounts = {
                ...itemCounts,
                [category._id]: results.items.filter(item => item.category._id.toString() === category._id.toString()).length
            };
            stockCounts = {
                ...stockCounts,
                [category._id]: results.items.filter(item => item.category._id.toString() === category._id.toString()).reduce((sum, currItem) => sum + currItem.qty, 0)
            };
        });
        //render category list page
        res.render('category_list', {
            title: 'Inventory App - All Categories',
            categories: results.categories,
            item_counts: itemCounts,
            stock_counts: stockCounts,
            sort: validateSort
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//render category details
exports.category_detail = async (req, res, next) => {
    try {
        //get sort order value and validate it as 1 or -1 only, default is 1
        const sortVal = parseInt(req.query.sortItem);
        const validateSort = sortVal !== 1 ? (sortVal !== -1 ? 1 : sortVal) : sortVal;
        //query db for items belonging to this specific category and this category
        const results = await async.parallel({
            items: async () => Item.find({ category: req.params.id }).collation({ locale: "en" }).sort({ name: validateSort }),
            category: async () => Category.findById(req.params.id)
        });
        //on success, check that a category was found
        if (results.category == null) {
            const err = new Error("Category not found");
            err.status = 404;
            return next(err);
        }
        //then render category detail page
        res.render('category_detail', {
            title: 'Inventory - Category Detail',
            category: results.category,
            category_items: results.items,
            sortItem: validateSort
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//render create category form
exports.category_create_get = async (req, res, next) => {
    try {
        //render category create page
        res.render('category_form', {
            title: 'Inventory - Create New Category',
            goToUrl: 'goToUrl("/categories")'
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//handle create category on POST
exports.category_create_post = [
    body('category_name', 'Name is required.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('category_description', 'Description should be at least 3 characters long.')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3 })
        .escape(),
    //process request after validation and sanitization.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            //create new category object with escaped and trimmed data.
            const category = new Category({
                name: req.body.category_name,
                description:  req.body.category_description,
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //errors present, render form again with sanitized values/errors messages.
                res.render("category_form", {
                    title: "Inventory - Create New Category",
                    currCategory: category,
                    goToUrl: 'goToUrl("/categories")',
                    errors: errors.array()
                });
            } else {
                //no errors, check if name already exists
                const nameUniqueCheck = await Category.findOne({ name: { $regex : new RegExp(req.body.category_name, "i")} });
                if (nameUniqueCheck != null) {
                    //if category name already exists throw error
                    let err = null;
                    err = new Error('Category name already exists');
                    err.msg = 'Category name already exists, please choose a new one.';
                    err.status = 409;
                    //render category create page with error
                    res.render("category_form", {
                        title: "Inventory - Create New Category",
                        currCategory: category,
                        goToUrl: 'goToUrl("/categories")',
                        errors: [err],
                    });
                } else {
                    //if no errors, save data
                    await category.save();
                    res.redirect(category.url);
                }
            }
        } catch (error) {
            //pass on any errors
            return next(error);
        }
    }
];

//render category delete page on GET.
exports.category_delete_get = async (req, res, next) => {
    try {
        //query db for items belonging to this specific category and this category
        const results = await async.parallel({
            items: async () => Item.find({ category: req.params.id }).collation({ locale: "en" }).sort({ name: 1 }),
            category: async () => Category.findById(req.params.id)
        });
        //on success, check category was found
        if (results.category == null) {
            //if no category found, return error
            const err = new Error("Category not found");
            err.status = 404;
            return next(err);
        }
        //on success render category delete page
        res.render('category_delete', {
            title: 'Inventory - Delete Category',
            category_items: results.items,
            category: results.category,
            goToUrl: `goToUrl("${results.category.url}")` //on cancel click go to category url
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

// Handle category delete on POST.
exports.category_delete_post = async (req, res, next) => {
    try {
        //query db for items belonging to this specific category and this category
        const results = await async.parallel({
            items: async () => Item.find({ category: req.params.id }).collation({ locale: "en" }).sort({ name: 1 }),
            category: async () => Category.findById(req.params.id)
        });
        //on success, check category was found
        if (results.category.length > 0) {
           //category has associated items. Render in same way as for GET route.
           res.render('category_delete', {
            title: 'Inventory - Delete Category',
            category_items: results.items,
            category: results.category,
            goToUrl: `goToUrl("${results.category.url}")` //on cancel click go to category url
        });
        }
        //on success delete category from db
        await results.category.deleteOne({ _id: req.body.category_id });
        res.redirect('/categories');
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};

//render category update form on GET.
exports.category_update_get = async (req, res, next) => {
    try {
        //query db for specified category
        const category = await Category.findById(req.params.id);
        //on success, check category was found
        if (category == null) {
            //if no category found, return error
            const err = new Error("Category not found");
            err.status = 404;
            return next(err);
        } else {
            res.render('category_form', {
                title: 'Inventory - Update Category',
                currCategory: category,
                goToUrl: `goToUrl("${category.url}")`
            });
        }
    } catch (error) {
        //pass on any errors
        return next(error);
    }

};

//handle category update form on POST.
exports.category_update_post = [
    body('category_name', 'Name is required.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('category_description', 'Description should be at least 3 characters long.')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3 })
        .escape(),
    //process request after validation and sanitization.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            //create new category object with escaped and trimmed data.
            const category = new Category({
                name: req.body.category_name,
                description:  req.body.category_description,
                _id: req.params.id
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //errors present, render form again with sanitized values/errors messages.
                res.render("category_form", {
                    title: "Inventory - Update Category",
                    currCategory: category,
                    goToUrl: `goToUrl("${results.category.url}")`,
                    errors: errors.array()
                });
            } else {
                //no errors, check if name already exists (do not include itself in check)
                const nameUniqueCheck = await Category.findOne({ name: { $regex : new RegExp(req.body.category_name, "i")}, _id: { $ne: req.params.id } });
                if (nameUniqueCheck != null) {
                    //if category name already exists throw error
                    let err = null;
                    err = new Error('Category name already exists');
                    err.msg = 'Category name already exists, please choose a new one.';
                    err.status = 409;
                    //render category create page with error
                    res.render("category_form", {
                        title: "Inventory - Update Category",
                        currCategory: category,
                        goToUrl: `goToUrl("${results.category.url}")`,
                        errors: [err],
                    });
                } else {
                    //if no errors, update data
                    await Category.findByIdAndUpdate(req.params.id, category, {});
                    res.redirect(category.url);
                }
            }
        } catch (error) {
            //pass on any errors
            return next(error);
        }
    }
];