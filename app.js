var express = require("express"),
	bodyParser = require("body-parser"),
	smtpTransport = require("nodemailer-smtp-transport"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	User = require("./Models/Users"),
	Blog = require("./Models/Blogger"),
	methodOverride = require("method-override"),
	LocalStrategy = require("passport-local"),
	nodemailer = require("nodemailer"),
	middleware = require("./middleware"),
	app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://jrince:Thefreak1@ds135444.mlab.com:35444/portfolio", {useMongoClient: true})
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

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});




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
			pass: process.env.EMAILPWD
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

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login"

}), function(req, res) {});

//blog routes

//index
app.get("/blogs", function(req, res) {
  //get all blogs from db
  Blog.find({}, function(err, allBlogs) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("blogs", { blogs: allBlogs });
    }
  })

});
//Create Route - Add new Blog to DB

app.post("/blogs", middleware.isLoggedIn ,function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newBlog = { name: name, image: image, description: desc, author: author};

  Blog.create(newBlog, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/blogs")
    }
  })
});

app.get("/blogs/:id", function(req, res) {
  //render based on ID
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("show", { blog: foundBlog});
    }
  });
});

app.get("/new",middleware.isLoggedIn ,function(req, res) {
  res.render("new");

});

app.get("/admin", middleware.isLoggedIn, function(req, res){
	res.render("admin");
});

app.get("/blogs/:id/edit", middleware.isLoggedIn, function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    res.render("edit", { blog: foundBlog });
  });
});

app.put("/blogs/:id", middleware.isLoggedIn, function(req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if (err) {
      res.redirect("/blogs");
    }
    else {
      res.redirect("/blogs/" + req.params.id)
    }

  });
});

app.delete("/blogs/:id", middleware.isLoggedIn, function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/blogs");
    } {
      res.redirect("/blogs");
    }
  });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})