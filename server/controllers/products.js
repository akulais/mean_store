var mongoose = require('mongoose');
var Product = mongoose.model('Product');
	module.exports = (function() {
 		return {
  		index: function(req, res) {
    		Product.find({}, function(err, results) {
       			if(err) {
         			console.log(err);
       			} else {
         			res.json(results);
       				}
   				})
  			},

  		create_product: function(req, res) {
  			var product = new Product({
    			name: req.body.name,
          image: req.body.image,
          description: req.body.description,
          qty: req.body.qty
    			});
      
            product.save(function(err){
              if (err) {
            // console.log('not valid', err.errors.name.message);
                    return res.json({message: "product names must contain at least 5 letters"});

              }else {
                product.save();
                return res.json({message: 'success'})
                };
                });
  			},

      update: function(req, res) {
        Product.findOne({name: product}, function(err, product) {
          product.qty = product.qty - qty;
          product.save();
        });
      }
 		}
		})();