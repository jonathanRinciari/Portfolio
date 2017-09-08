var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var BlogSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String

});

BlogSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Blog", BlogSchema);