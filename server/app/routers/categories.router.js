let express = require('express');
let router = express.Router();


let controller = require('../controllers/categories.controller.js');


router.get('/getCategories', controller.getCategories);

router.get('/getSubCategories/:id', controller.getSubCategories);

router.get('/getSubCategoryFields/:id', controller.getSubCategoryFields);

router.get('/getCategoryFields/:id', controller.getCategoryFields);

router.post('/saveNewCategory', controller.saveNewCategory);
 
router.get('/deleteCategory/:id', controller.deleteCategory);

router.post('/saveNewSubcategory', controller.saveNewSubcategory);

router.get('/deleteSubcategory/:id', controller.deleteSubcategory);

router.get('/getAllFields', controller.getAllFields);

router.post('/saveNewCategoryField', controller.saveNewCategoryField);

router.post('/deleteCategoryField', controller.deleteCategoryField);

router.post('/saveNewSubcategoryField', controller.saveNewSubcategoryField);

router.post('/deleteSubcategoryField', controller.deleteSubcategoryField);

router.post('/saveNewField', controller.saveNewField);

router.get('/deleteField/:id', controller.deleteField);

router.get('/getFieldsUsage', controller.getFieldsUsage);

module.exports = router;