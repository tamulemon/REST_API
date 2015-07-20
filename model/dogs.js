var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var dogSchema = new Schema ({ //camel case for schema
	name : String,
	age : Number,
	cuteness : Number, 
	birthday : Date,
	friends : [],
	enemies : [{type: 
					 Schema.Types.ObjectId, 
					 ref: 'Cat'}]
});

module.exports = mongoose.model('Dog', dogSchema); //capital letter for model

