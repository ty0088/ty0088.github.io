const async = require('async');
const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Item = require('../models/item');

exports.index = async (req, res, next) => {
    // const categories = await Category.find({}).sort({ name: 1 });
    try {
        let results = await async.parallel({
            items: async () => Item.find({}),
            categories: async () => Category.find({}).sort({ name: 1 })
        })
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
            console.log(category.name);
            console.log(results.items.filter(item => item.category._id.toString() === category._id.toString()));
        });
        
        res.render('index', {
            title: 'Inventory App',
            categories: results.categories,
            item_counts: itemCounts,
            stock_counts: stockCounts
        });
    } catch (err) {
        return next(err);
    }
};