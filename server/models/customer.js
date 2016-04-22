var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new mongoose.Schema({
  	name: {type: String, required:true, minlength: 3},
  	orders: [{type: Schema.Types.ObjectId, ref : 'Order'}],
  	created_at: { type : Date, default: Date.now }
	});
// customerSchema.path('name').required(true, 'Name can not contain less than three letters.');
mongoose.model('Customer', customerSchema);
