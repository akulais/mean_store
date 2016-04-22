var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
  module.exports = (function() {
    return {
      index: function(req, res) {
        Customer.find({}, function(err, results) {
            if(err) {
              console.log(err);
            } else {
              res.json(results);
              }
          })
        },

      create: function(req, res) {
        var customer = new Customer({
          name: req.body.name
          });
        console.log(req.body.name,'test test');
          customer.save(function(err){
              if (err) {
            // console.log('not valid', err.errors.name.message);
                    return res.json({message: "Your name is too short, at least 3 letters are required."});
              }else {
                customer.save();
                return res.json({message: 'success'})
                };
                });
 
        },
      
      delete: function(req, res) {
        Customer.remove({_id: req.params.id}, function(err, status) {
          if (err) {
            console.log('not working', err);
          } else {
            res.json({message: 'he gone'});
          }
        });
      }
    }
    })();