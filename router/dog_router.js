var express = require('express'),
		dogRouter = express.Router(), //creates a router as a module, loads a middleware 
		mongoose = require('mongoose'),
		Cat = require('../model/cats.js'),
		Dog = require('../model/dogs.js'),
		errorHandler = function(err) {console.log(err)};


dogRouter.get('/all', function(req, res) {
	Dog.find({}, function(err, data) {
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t find data for dogs.'});
		}
		else {
			res.json(data);
		}
	});
});


dogRouter.get('/:dogName', function(req, res) {
		Dog.find({name: req.params.dogName}, function(err, data) {
//			console.log(req.params.dogName);
		if (err) {
			errorHandler(err);
			res.status(404);
			console.log('Error on getting data');
			res.json({msg: 'Couldn\'t find data for your dog.'});
		}
		else {
			console.log('Successfully get data');
			res.json(data);
		}
	});
});


dogRouter.post('/all', function(req, res) {
//	console.log(req.body);  // need json parser to get the body
	var dog = new Dog(req.body);
	dog.save(dog, function(err) {
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t save your dog.'});
		} 
		else {
			res.json({msg: 'dog is successfully saved.'});
		}
	})
});

dogRouter.put('/:dogName', function(req, res) {
	Dog.update({name: req.params.dogName}, {$set: req.body}, {upsert:true}, function(err) {
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t update your dog.'});
		} 
		else {
			res.json({msg: 'dog is successfully updated.'});
		}
	});
});


dogRouter.delete('/:dogName', function(req, res) {
	Dog.remove({name: req.params.dogName}, function(err) {
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t update your dog.'});
		} 
		else {
			res.json({msg: 'dog is successfully updated.'});
		}
	});
});

exports.dogRouter = dogRouter;