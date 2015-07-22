var express = require('express'),
		catRouter = express.Router(), //creates a router as a module, loads a middleware 
		mongoose = require('mongoose'),
		Cat = require('../model/cats.js'),
		Dog = require('../model/dogs.js'),
//		Cat = mongoose.model('Cat'),
//		Dog = mongoose.model('Cat'),
		errorHandler = function(err) {console.log(err)};


// view all cats
catRouter.get('/all', function(req, res) {
	Cat.find({}, function(err, data) {
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t find data for cats.'});
		}
		else {
			res.json(data);
		}
	});
});


// query a cat by name
catRouter.get('/:catName', function(req, res) {
		Cat.find({name: req.params.catName}, function(err, data) {
//			console.log(req.params.catName);
		if (err) {
			errorHandler(err);
			res.status(404);
			console.log('Error on getting data');
			res.json({msg: 'Couldn\'t find data for your cat.'});
		}
		else {
			console.log('Successfully get data');
			res.json(data);
		}
	});
});


// add a new cat
catRouter.post('/all', function(req, res) {
//	console.log(req.body);  // need json parser to get the body
	var cat = new Cat(req.body);
	cat.save(cat, function(err) {
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t save your cat.'});
		} 
		else {
			res.json({msg: 'Cat is successfully saved.'});
		}
	})
});


// update a cat by name, will insert if the name doesn't exist
catRouter.put('/:catName', function(req, res) {
	Cat.update({name: req.params.catName}, {$set: req.body}, {upsert:true, multi:true}, function(err) {
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t update your cat.'});
		} 
		else {
			res.json({msg: 'Cat is successfully updated.'});
		}
	});
});

// delete by name
catRouter.delete('/:catName', function(req, res) {
	Cat.remove({name: req.params.catName}, function(err) {
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t update your cat.'});
		} 
		else {
			res.json({msg: 'Cat is successfully updated.'});
		}
	});
});

// add a friend: use $push to push an object to friends array. multiple : true. 
catRouter.put('/addfriend/:catName', function(req, res) {
	Cat.update({name: req.params.catName}, {$push: {friends: req.body}}, {upsert: false, multi:true}, function(err) {
		// options, need to be grouped in {}
		if (err) {
			errorHandler(err);
			res.status(404);
			res.json({msg: 'Couldn\'t add friend.'});
		} 
		else {
			res.json({msg: 'Friend is successfully added.'});
		}
	});
});


// add enemy from dogs collection, multi: true, save objectID to the enemies array

	// find will always return array, so need to use forEach method
//	Cat.find({name: req.params.catName}, function(err, cat) {
//		if (err) {
//			errorHandler(err);
//			res.status(404);
//			res.json({msg: 'Couldn\'t add enemy.'});
//		} 
//		else {
////			console.log(cat); 
//			Dog.find({name: req.body['name']}, function(error, dog) {
//				if (error) {
//					errorHandler(error);
//					res.status(404);
//					res.json({msg: 'Couldn\'t find the dog.'});
//				}
//				else {
//					cat.forEach(function(one) {
//						console.log(one.enemies);
//						for (var i = 0; i < dog.length; i++) {
//							one.enemies.push(dog[i]._id);
//						}
//						one.save(); // have to save
//					});
//					res.json({msg: 'Enemy is successfully added.'});
//				}
//			});
//		}
//	});
catRouter.put('/addenemy/:catName', function(req, res) {
	
	var fetchDog = function(dogName, callback){
		Dog.find({name: dogName}, function(err, data) {
			if (err) {
				callback(err);
			}
			else {
				callback(null, data);
			}
		});
	};
	
	var updateCat = function(err, dogData) {
		if(err) {
			errorHandler(error);
			res.status(404);
			res.json({msg: 'Couldn\'t find the dog.'});
		} 
		else {
			
			var dogIDs = [];
			dogData.forEach(function(adog) {
				dogIDs.push(adog._id);
			});
			
			if(dogIDs.length === 0) {
				res.json({msg: 'There is not dog with such name'});
				return;
			}
			
			Cat.update({name: req.params.catName}, {$pushAll: {enemies: dogIDs}}, {multi: true}, function(err, catData) {
				if (err) {
					errorHandler(err);
					res.status(404);
					res.json({msg: 'Couldn\'t add enemies to your cat.'});
				} 
				else {
					res.json({msg: 'Enemy is successfully added.'});
				}
			});
		}
	};
	
	fetchDog(req.body.name, updateCat);
});


exports.catRouter = catRouter;