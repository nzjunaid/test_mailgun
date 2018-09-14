var express=require("express");
var app = express();
var validator = require("email-validator");
var bodyParser=require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mailgun = require("mailgun-js");
var api_key = 'ddeb240e9308c607779b04e6dbdd5018-7bbbcb78-a894679d';
var DOMAIN = 'sandbox7102020c8ea5469883f9452e96fc58fc.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
var fs=require("fs");
var rl = require('readline-specific')
var readLastLines = require('read-last-lines');



var getAge = require('get-age');
var server=app.listen("8080",function(){

	console.log("server working 8080");
});


app.post("/",urlencodedParser,function(req,res){

	name=req.body.name;
	email=req.body.email;
	dateofbirth=req.body.dateofbirth;
	machine=req.headers.host;
	if(!name)
		return 	res.status(400).send({"error":"no name given as input"});
	if(!email)
		return res.status(400).send({"error":"email required"});
	if(!validator.validate(email) )
		return res.status(400).send({"error":"invalid email"});

	var age=undefined;
	if(dateofbirth)
		age=getAge(dateofbirth);
		if(age<16)
			return res.status(400).send("too young");
		else if(age>120)
			return res.status(400).send("too old");
	
	if(!dateofbirth)
		dateofbirth='';

	data_to_append=name+'\n'+email+'\n'+dateofbirth+'\n'+machine;
	data_to_append={name:name,email:email,dateofbirth:dateofbirth,machine:machine };
	var obj=[];
	
	fs.readFile("file.txt",'utf8',function(err,data){
		if(err)
			console.log(err);
		else
		{
			if(data.length)
			{	
				obj=JSON.parse(data);
				//console.log(obj);
				//console.log("bsduhau");
				obj.push(data_to_append);
				var json = JSON.stringify(obj); 
    			fs.writeFile('file.txt', json, 'utf8', function(){
    				console.log("susccessfull appending");
    			});
    		}
    		else
    		{
    			obj = [];
    			obj.push(data_to_append);
    			var json = JSON.stringify(obj);
    			fs.writeFile('file.txt', json, 'utf8', function(){
    				console.log("susccessfull writing");
    			});
    		}
		}
	});

	var data = {
  		from: 'Junaid N Z <me@samples.mailgun.org>',
  		to: 'junaidnz97@gmail.com',
  		subject: 'Hello',
  		text: 'Hi\nWelcome to our network! Here’s your profile informations\nEmail:'+email+'\nDate of Birth:'+dateofbirth+'\nMachine: \n'+machine+'\n'
	};
	res.status(200).send(data.text);
	/*mailgun.messages().send(data, function (error, body) {

  	if(error)
  	{
  		console.log(error);
  		return res.status(400).send(error);
  	}
  	else
  		return res.status(200).send("susccessfull");
  
	});*/

});


app.get("/allcontent",function(req,res){
	res.status(200);
	
	var obj=fs.readFileSync('file.txt','utf-8');
	return res.status(200).send(JSON.parse(obj));
	
});

app.get("/getlatestendpoint",function(req,res){

	var obj=fs.readFileSync('file.txt','utf-8');
	obj=JSON.parse(obj);
	return res.status(200).send(obj[obj.length-1]);

});

app.get("/getxthcontent",function(req,res){

	if(!req.query.x)
		return req.status(400).send("error");
	obj=fs.readFileSync("file.txt",'utf8');
	obj=JSON.parse(obj);
	if(req.query.x > obj.length)
		return res.status(404).send("invalid input");
	return res.status(200).send(obj[req.query.x-1])
});

module.exports={
	app:app
};