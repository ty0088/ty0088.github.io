const async = require('async');
const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Item = require('../models/item');

exports.item_list = async (req, res, next) => {
    try {
        //get sort by value and validate it as 1 or -1 only, default is 1
        const sortVal = parseInt(req.query.sort);
        const validateSort = sortVal !== 1 ? (sortVal !== -1 ? 1 : sortVal) : sortVal;
        const sortByVal = req.query.sortBy;
        const validateSortByVal = sortByVal === undefined ? 'name' : sortByVal;
        const results = await Item.find({}).populate('category').sort({ [validateSortByVal]: validateSort });
        res.render('item_list', {
            title: 'Inventory - All Items',
            item_list: results,
            sort: validateSort,
            sortBy: validateSortByVal
        });
    } catch (error) {
        return next(error);
    }
};