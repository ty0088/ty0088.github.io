const async = require('async');
const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Item = require('../models/item');

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
        //on success, check that a category was actually returned
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