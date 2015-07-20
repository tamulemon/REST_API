var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var server = require('../server.js');
var fileCount;
var jsonFile;

chai.use(chaiHttp);

describe('http server', function(){
	
	it ('add a new cat', function(done) {
		chai.request('localhost:8080/cat')
		.post('/all')
		.send({ name: 'Cutie', age: 1, cuteness: 10, friends: [], enemies: []})
		.end(function (err, res) {
     	expect(err).to.be.null;
     	expect(res).to.have.status(200);
			expect(JSON.parse(res.text)).deep.equal({msg: 'Cat is successfully saved.'});
			done();
		});
	});
	

	
	it ('get Cutie', function(done) {
		chai.request('localhost:8080')
		.get('/cat/Cutie')
//		.query({name: 'Cutie'}) 
		.end(function(err, res) {
//			console.log(res.body);
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.header['content-type']).equal('application/json; charset=utf-8');
			expect(res.body).to.have.length.least(1);
			expect(res.body[0].name).equal('Cutie');
			expect(res.body[0].cuteness).equal(10);
			done();
		});
	});
	

	it ('successfully update a cat', function(done) {
		chai.request('localhost:8080')
		.put('/cat/Cutie') 
//		.query({name: 'Cutie'}) 
		.send({cuteness: 3})
		.end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			done();
		});
	});
		
	it ('changes information about a cat', function(done) {	
		chai.request('localhost:8080')
		.get('/cat/Cutie') 
		.end(function (err, res) {
			expect(res.body[0].cuteness).equal(3);
			done();
		});
	});
	
	
	it ('delete a cat', function(done) {
		chai.request('localhost:8080')
		.delete('/cat/Cutie')
		.end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			done();
		});
	});
	
});