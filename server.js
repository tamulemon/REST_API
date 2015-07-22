var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		url = require('url'),
		port = process.env.port || 8080,
		mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/cat_dog');

app.use(bodyParser.json());

var catRouter = require('./router/cat_router.js').catRouter;
app.use('/cat', catRouter); //only the path after /cat will be considered as path. /cat/ is '/'

var dogRouter = require('./router/dog_router.js').dogRouter;
app.use('/dog', dogRouter);

catRouter.use(function(req, res, next) {
	console.log('Request comes in for ' + url.parse(req.url).path + ' at time: ' + new Date().toString());
	next();
})


dogRouter.use(function(req, res, next) {
	console.log('Request comes in for ' + url.parse(req.url).path + ' at time: ' + new Date().toString());
	next();
})


app.listen(port, function(){
	console.log('server is running');
});