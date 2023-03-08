const express = require('express');
const router = express.Router();

// Require controller modules.
const category_controller = require('../controllers/categoryController');
const item_controller = require('../controllers/itemController');

/* GET home page - redirect. */
router.get('/', function(req, res, next) {
  res.redirect('/categories');
});

//Category routes
//GET: create category form
router.get('/category/create', category_controller.category_create_get);

//POST: submit create category form
router.post('/category/create', category_controller.category_create_post);

//GET: update category form
router.get('/category/:id/update', category_controller.category_update_get);

//POST: submit update category form
router.post('/category/:id/update', category_controller.category_update_post);

//GET: delete category
router.get('/category/:id/delete', category_controller.category_delete_get);

//POST: delete category
router.post('/category/:id/delete', category_controller.category_delete_post);

//GET: category details
router.get('/category/:id', category_controller.category_detail);

//GET: home page which displays a list of existing categories links
router.get('/categories', category_controller.category_list);


// item routes
//GET: create item form with category param
router.get('/item/create/:category_id', item_controller.item_create_get);

// //GET: create item form
router.get('/item/create', item_controller.item_create_get);

//POST: submit create item form with category param
router.post('/item/create/:category_id', item_controller.item_create_post);

//POST: submit create item form
router.post('/item/create', item_controller.item_create_post);

//GET: update item form
router.get('/item/:id/update', item_controller.item_update_get);

//POST: submit update item form
router.post('/item/:id/update', item_controller.item_update_post);

//GET: delete item
router.get('/item/:id/delete', item_controller.item_delete_get);

//POST: delete item
router.post('/item/:id/delete', item_controller.item_delete_post);

//GET: item details
router.get('/item/:id', item_controller.item_detail);

//GET: display list of all items
router.get('/items', item_controller.item_list);

module.exports = router;
