var express = require("express"),
	bodyParser = require("body-parser"),
	smtpTransport = require("nodemailer-smtp-transport"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	User = require("./models/user"),
	Blog = require("./models/blog"),
	methodOverride = require("method-override"),
	LocalStrategy = require("passport-local"),
	nodemailer = require("nodemailer"),
	app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27018/portfolio_blog", {useMongoClient: true})
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

//Passport Configuration
app.use(require("express-session")({
    secret: "This is the best app I can build",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/blog",
  failureRedirect: "/login"

}), function(req, res) {});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})