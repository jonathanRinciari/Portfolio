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

	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '%gt;',
		to: 'rinciarijoc@gmail.com',
		subject: 'Website Contact Form' + req.body.name,
		text: "message" + req.body.message,
		date: req.body.date,
		budget: req.body.price
	
	};

	smtpTrans.sendMail(mailOpts, function(error, response){
		if(error){
			res.render("contact", {
				title: "Jon Rinciari - Contact",
				msg: "Error Occured, Message Not Sent",
				err: true,
				page: "contact"})
			} else {
				console.log("success")
				res.render("contact", {
					title: "Jon Rinciari - Contact",
					msg: "Message Sent!",
					err: false,
					page: "Contact"
				})
			}
		})

})

app.get("/homepage", function(req, res){
	res.render("homepage");
});

app.get("/about", function(req, res){
	res.render("about");
});






app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})