#! /usr/bin/env node

console.log('This script populates some categories and items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const Category = require('./models/category');
const Item = require('./models/item');


const mongoose = require('mongoose');

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const categories = [];

const createCategory = async (name, description) => {
    try {
        const category = new Category({ name, description });
        let result = await category.save();
        categories.push(category);
        console.log('categories saved successfully');
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const createItem = async (name, description, category, price, qty) => {
    console.log('item create');
    try {
        const item = new Item({ name, description, category, price, qty });
        let result = await item.save();
        console.log('items saved successfully');
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const createCategories = async () => {
    try {  
        let results = await async.series([
            async () => {
                return createCategory('PC Parts', 'Parts for PCs');
            },
            async () => {
                return createCategory('Console Parts', 'Parts for games consoles');
            },
            async () => {
                return createCategory('Phone Parts', 'Parts for mobile phones');
            }
        ]);
        console.log(results);
        return results;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const createItems = async () => {
    try {
        let results = async.parallel([
            async () => {
                return createItem('Keyboard', 'Wireless keyboard', categories[0], 60, 10);
            },
            async () => {
                return createItem('Mouse', 'Wireless Mouse', categories[0], 30, 10);
            },
            async () => {
                return createItem('26" LED Monitor', '26inch LED Monitor 144hz', categories[0], 300, 10);
            },
            async () => {
                return createItem('Controller', 'Wireless controller for a console', categories[1], 44.99, 10);
            },
            async () => {
                return createItem('Headset', 'Wireless headset with microphone', categories[1], 100, 20);
            },
            async () => {
                return createItem('Controller Charger', 'Charger for wireless controller', categories[1], 29.99, 10);
            },
            async () => {
                return createItem('Phone Case', 'Protective case for a smart phone', categories[2], 30, 10);
            },
            async () => {
                return createItem('Screen Protector', 'Screen protector for a smart phone', categories[2], 30, 10);
            },
            async () => {
                return createItem('Wireless Charger', 'Wireless charger for a smart phone', categories[2], 300, 5);
            }
        ]);
        console.log(results);
        return results;
    } catch (err) {
        console.log(err);
        return err;
    }
};

async.series([
    createCategories,
    createItems
],
(err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log('DB populated successfully!');
        console.log(results);
    }
    mongoose.connection.close();
});



