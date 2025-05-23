const categoryController = require('./categoryController');
const productController  = require('./productController');

exports.getAllCategoryForUser    = categoryController.getAllCategory;
exports.getAllProductsForUser    = productController.getAllProducts;
exports.getProductDetailsForUser = productController.getProduct;
