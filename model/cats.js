var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var catSchema = new Schema ({ //camel case for schema
	name : String,
	age : Number,
	cuteness : Number, 
	birthday : Date,
	friends : [],
	enemies : [{
		type: Schema.Types.ObjectId, 
		ref: 'Dog'}]
});

module.exports = mongoose.model('Cat', catSchema); //capital letter for model

