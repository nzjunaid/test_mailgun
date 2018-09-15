var chai=require("chai");
var app=require("../server.js");
var chaiHttp = require('chai-http');
var assert=require("assert");
chai.use(chaiHttp);
app=app.app;
describe("insert values",function(){

	/*it("should return 200 if valid inputs",function(){

		chai.request(app)
		.post('/')
		.type('form')
		.send({"name":"Sachin","email":"sachin@gmail.com","dateofbirth":"1997-09-16"})
		.then(function(res){
			assert.equal(res.status,200);
		})
	});*/

	it("should return 400 for invalid names",function(){

		chai.request(app)
		.post('/')
		.type('form')
		.send({"name":"","email":"sachin@gmail.com","dateofbirth":"1997-09-16"})
		.then(function(res){
			assert.equal(res.status,400);
			console.log("insert failed because of invalid name , status = ",res.status);

		});

	});

	it("should return 400 for invalid emails",function(){

		chai.request(app)
		.post('/')
		.type('form')
		.send({"name":"abcd","email":"","dateofbirth":"1997-09-16"})
		.then(function(res){
			assert.equal(res.status,400);
			console.log("insert failed because of invalid email , status = ",res.status);

		});

	});


	it("should return 400 for invalid dateofbirths",function(){

		chai.request(app)
		.post('/')
		.type('form')
		.send({"name":"abcd","email":"junaidnz97@gmai.com","dateofbirth":"2016-09-16"})
		.then(function(res){

			assert.equal(res.status,400);
			console.log("insert failed because of invalid dateofbirth , status = ",res.status," ,reason = ",res.text);

		});

	});

});

describe("get contents",function(){

	it("should return status 200 for all content",function(){
		chai.request(app)
		.get('/allcontent')
		.then(function(res){
			assert.equal(res.status,200);
			console.log("all contents retrieved , status = ",res.status," , total number of items retrieved = ",res.body.length);	

		});
	});

	it("should return status 200 for get latest endpoint if file not empty",function(){
		chai.request(app)
		.get('/getlatestendpoint')
		.then(function(res){
			assert.equal(res.status,200);
			console.log("last entry retrieved , status = ",res.status);
		});
	});


	it("should return status 200 for xth content if present",function(){
		chai.request(app)
		.get('/getxthcontent?x=3')
		.then(function(res){
			assert.equal(res.status,200);
			console.log("xth content retrieved , status = ",res.status);
		});
	});

	it("should return status 404 for xth content if not present",function(){
		chai.request(app)
		.get('/getxthcontent?x=1000')
		.then(function(res){
			assert.equal(res.status,404);
			console.log("xth content not retrieved because of ivalid x, status = ",res.status);

		});
	});



});

describe("integrated test",function(){

	it("integrated_test",function(done){

		var last_num=0;
		var last_body=undefined;
		function fun(i){

			chai.request(app)
			.get('/getxthcontent?x='+i)
			.then(function(res){

				if(res.status==200)
				{
					last_num=i;
					last_body=res.body;
					console.log("Last entry retrieved = ",last_num);
					fun(i+1);
				}
				else if(res.status==404)
				{
				
					console.log("All entries are successfully retrieved");
					last_num=i-1;
					chai.request(app)
					.get("/getlatestendpoint")
					.then(function(resp){
						assert(last_body,resp.body);
						chai.request(app)
						.post('/')
						.type('form')
						.send({"name":"","email":"sachin@gmail.com","dateofbirth":"1997-09-16"})
						.then(function(res){
							assert.equal(res.status,400);
							console.log("insert failed because of invalid name , status = ",res.status);
						});

						chai.request(app)
						.post('/')
						.type('form')
						.send({"name":"abcd","email":"","dateofbirth":"1997-09-16"})
						.then(function(res){
							assert.equal(res.status,400);
							console.log("insert failed because of invalid email , status = ",res.status);
						});

						chai.request(app)
						.post('/')
						.type('form')
						.send({"name":"abcd","email":"junaidnz97@gmail.com","dateofbirth":"2015-09-16"})
						.then(function(res){
							assert.equal(res.status,400);
							assert.equal(res.text,"too young");
							console.log("insert failed because of invalid age , status = ",res.status," ,reason = ",res.text);
						});

						chai.request(app)
						.post('/')
						.type('form')
						.send({"name":"abcd","email":"junaidnz97@gmail.com","dateofbirth":"1800-09-16"})
						.then(function(res){
							assert.equal(res.status,400);
							assert.equal(res.text,"too old");
							console.log("insert failed because of invalid age , status = ",res.status," , reason = ",res.text);
						});

						chai.request(app)
						.post('/')
						.type('form')
						.send({"name":"nivin","email":"nivin@gmail.com","dateofbirth":"1997-07-16"})
						.then(function(res){
							assert.equal(res.status,200);
							console.log("inserted successfully , status = ",res.status);
							done();
						});
					});
				}
			});
		};
		fun(1);
	});
});