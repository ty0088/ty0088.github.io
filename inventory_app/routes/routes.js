const express = require('express');
const router = express.Router();

//Category routes
//GET: home page which displays a list of existing categories links
router.get('/categories', );

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
router.get('/category/:id', );


//item routes
//GET: create item form
router.get('/item/create', );

//POST: submit create item form
router.post('/item/create', );

//GET: update item form
router.get('/item/:id/update', );

//POST: submit update item form
router.post('/item/:id/update', );

//GET: delete item
router.get('/item/:id/delete', );

//POST: delete item
router.post('/item/:id/delete', );

//GET: item details
router.get('/item/:id', );

//GET: display list of all items
router.get('/items', );

module.exports = router;