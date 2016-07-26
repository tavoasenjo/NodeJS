var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");


// initialize app
var app = express();


//We need to tell jade which template files will be in
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
	res.render('index', {title: 'Welcome'}); //we call the index located in views folder.
	// res.send('<h1>Hello Tavo</h1>');
});

app.get("/about", function(req, res){
	res.render('about'); //we call the about.
});

app.get("/contact", function(req, res){
	res.render('contact'); //we call the contact.
});

app.post("/contact/send", function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'tavoasenjo@gmail.com',
			pass: 'password' //use your password
		}
	});

	var mailOptions = {
		from: 'Tavo <tavoasenjo@gmail.com>',
		to: 'contact@tavo.codes',
		subject: 'Website Submission',
		text: 'you have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
		html: '<p>you have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		}else{
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});


app.listen(3000);
console.log("server is running on port 3000");