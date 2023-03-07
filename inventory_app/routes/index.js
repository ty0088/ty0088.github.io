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
router.get('/category/create', );

//POST: submit create category form
router.post('/category/create', );

//GET: update category form
router.get('/category/:id/update', );

//POST: submit update category form
router.post('/category/:id/update', );

//GET: delete category
router.get('/category/:id/delete', );

//POST: delete category
router.post('/category/:id/delete', );

//GET: category details
router.get('/category/:id', category_controller.category_detail);

//GET: home page which displays a list of existing categories links
router.get('/categories', category_controller.category_list);


//item routes
//GET: create item form
router.get('/item/create', item_controller.item_create_get);

//POST: submit create item form
router.post('/item/create', item_controller.item_create_post);

//GET: update item form
router.get('/item/:id/update', );

//POST: submit update item form
router.post('/item/:id/update', );

//GET: delete item
router.get('/item/:id/delete', );

//POST: delete item
router.post('/item/:id/delete', );

//GET: item details
router.get('/item/:id', item_controller.item_detail);

//GET: display list of all items
router.get('/items', item_controller.item_list);

module.exports = router;
