var customers = require('./../controllers/customers.js');
var orders = require('./../controllers/orders.js');
var products = require('./../controllers/products.js');

	module.exports = function(app) {
		app.get('/customers', function(req, res) {
  			customers.index(req, res);
			});

		app.post('/create', function(req, res) {
			customers.create(req, res);
			});

		app.post('/order', function(req, res) {
			orders.order(req, res);
			});

		app.put('/update', function(req, res) {
			console.log(req.body.name, "update product");
			product = req.body.name;
			console.log(req.body.qty,"update qty");
			qty = req.body.qty;
			products.update(product, qty, req, res);
			});

		app.get('/orders', function(req, res) {
			orders.index(req, res);
			});

		app.delete('/delete/:id', function(req, res) {
			customers.delete(req, res);
			});
		
		app.get('/products', function(req, res) {
  			products.index(req, res);
			});

		app.post('/create_product', function(req, res) {
			products.create_product(req, res);
			});
  	};