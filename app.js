var express = require("express"),
	app = express();

app.get("/", function(req, res){
	res.send("This is the Loading Page!");
});

app.get("/homepage", function(req, res){
	res.send("This is the home page");
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})