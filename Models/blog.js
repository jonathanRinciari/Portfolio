var mongoose = require("mongoose");


var BlogSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }

});

module.exports = mongoose.model("Blog", BlogSchema);