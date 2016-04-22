var mongoose = require('mongoose');
var Order = mongoose.model('Order');
	module.exports = (function() {
 		return {
  		index: function(req, res) {
    		Order.find({}, function(err, results) {
       			if(err) {
         			console.log(err);
       			} else {
              // console.log('result', results);
         			res.json(results);
       				}
   				})
  			},

  		order: function(req, res) {
  			var order = new Order({
    			name: req.body.name,
          qty: req.body.qty,
          product: req.body.product
    			});
    		order.save(order);
    		res.json({message: 'success'})
  			}
 		}
		})();