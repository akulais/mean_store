var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
  	name: {type: String, required:true, minlength: 5},
  	image: String,
  	description: String,
  	qty: Number,
  	created_at: { type : Date, default: Date.now }
	});

// productSchema.path('name').required(true, 'Name can not be blank');
// productSchema.path('image').required(true, 'image can not be blank');
// productSchema.path('description').required(true, 'description can not be blank');
// productSchema.path('qty').required(true, 'quantity can not be blank');
mongoose.model('Product', productSchema);