var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
  	product: String,
  	qty: Number,
  	name: String,
  	// [{type: Schema.Types.ObjectId, ref : 'Customer'}],
  	created_at: { type : Date, default: Date.now }
	});

mongoose.model('Order', orderSchema);
