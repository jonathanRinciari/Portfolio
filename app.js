var express = require("express"),
	app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("LandingPage")
});

app.get("/homepage", function(req, res){
	res.render("homepage")
});






app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})