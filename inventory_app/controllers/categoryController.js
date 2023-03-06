const async = require('async');
const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Item = require('../models/item');

exports.category_list = async (req, res, next) => {
    try {
        const sortVal = parseInt(req.query.sort);
        const validateSort = sortVal !== 1 ? (sortVal !== -1 ? 1 : sortVal) : sortVal;
        const results = await async.parallel({
            items: async () => Item.find({}),
            categories: async () => Category.find({}).sort({ name: validateSort })
        });
        //count amount of unique items and total stock in each category and return an object with info
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
        res.render('category_list', {
            title: 'Inventory App - All Categories',
            categories: results.categories,
            item_counts: itemCounts,
            stock_counts: stockCounts,
            sort: validateSort
        });
    } catch (error) {
        return next(error);
    }
};

exports.category_detail = async (req, res, next) => {
    const sortVal = parseInt(req.query.sortItem);
    const validateSort = sortVal !== 1 ? (sortVal !== -1 ? 1 : sortVal) : sortVal;
    try {
        const results = await async.parallel({
            items: async () => Item.find({ category: req.params.id }).sort({ name: validateSort }),
            category: async () => Category.findById(req.params.id)
        });
        if (results.category == null) {
            const err = new Error("Category not found");
            err.status = 404;
            return next(err);
        }
        res.render('category_detail', {
            title: 'Inventory - Category Detail',
            category: results.category,
            category_items: results.items,
            sortItem: validateSort
        });
    } catch (error) {
        return next(error);
    }
};