var express = require("express"),
	bodyParser = require("body-parser"),
	smtpTransport = require("nodemailer-smtp-transport"),
	nodemailer = require("nodemailer"),
	app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
	res.render("LandingPage");
});

app.get("/contact", function(req, res){
	res.render("contact");
});

app.post("/contact", function(req, res){
	var mailOpts, smtpTrans;

	smtpTrans = nodemailer.createTransport(smtpTransport({
		service: 'Gmail',
		auth: {
			user: "rinciarijoc@gmail.com",
			pass: "Thefreak1"
	}

	}));

	var contactInfo =  ("Message: " + req.body.message + ",  Budget: " + req.body.price + ",  Deadline: " + req.body.date)

	console.log(contactInfo)
	mailOpts = {
		sender: req.body.email,
		to: 'rinciarijoc@gmail.com',
		subject: 'Website Contact Form: ' + req.body.name + "  (" + req.body.email + ")",
		text: contactInfo
		
	
	};

	smtpTrans.sendMail(mailOpts, function(error, response){
		if(error){
			res.render("contact", {
				title: "Jon Rinciari - Contact",
				msg: "Error Occured, Message Not Sent",
				err: true,
				page: "contact"})
			} else {
				res.redirect("success")
				
			}
		})

});

app.get("/homepage", function(req, res){
	res.render("homepage");
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/success", function(req, res){
	res.render("success");
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/ideas", function(req, res){
	res.render("ideas");
});

app.get("/design", function(req, res){
	res.render("design");
});

app.get("/skills", function(req, res){
	res.render("skills");
});

app.get("/portfolio", function(req, res){
	res.render("portfolio");
});

app.get("/blog", function(req, res){
	res.render("blog");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})