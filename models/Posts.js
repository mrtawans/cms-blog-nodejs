var mongoose    	= require('mongoose');
var Schema 			= mongoose.Schema;

var PostsSchema = new Schema({
	title: String,
});

module.exports = mongoose.model('Posts', PostsSchema);


// var mongoose = require('mongoose');

// module.exports = mongoose.model('User', {
//     email: String,
//     username: String,
//     password: String,
//     image: String,
//     bio: String,
// 	following: [{userId: String}],
// 	followers: [{userId: String}]
// });