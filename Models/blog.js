var mongoose = require("mongoose");


var BlogSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String

});

module.exports = mongoose.model("Blog", BlogSchema);