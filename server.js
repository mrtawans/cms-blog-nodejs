// =============================================================================
// require modules & connection variables
// =============================================================================
var express 	= require('express');
var app 		= express();
var router 		= express.Router();
var bodyParser  = require('body-parser');
var mongoose   	= require('mongoose');
var socket 		= require('socket.io');
var compression = require('compression');

// =============================================================================
// Connection & Database
// =============================================================================
mongoose.connect('mongodb://usernametest:passwordtest@ds039195.mongolab.com:39195/deedatabase'); // connect to our database
var Posts     = require('./models/Posts');
// =============================================================================



// =============================================================================
// middleware to use for all requests
// =============================================================================

// Turning on gzip compression can hugely impact the performance of your webapp
app.use(compression()); 

router.use(function(req, res, next) {
	res.header(200, "Content-Type", "application/json; charset=utf-8");
    next(); // make sure we go to the next routes and don't stop here
});

// =============================================================================
// Template & Directory
// =============================================================================
// serve static files, I am directing express to use public folder as my assets folder to server images/js/css files
app.use(express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/ngroute', express.static(__dirname + '/node_modules/angular-route/'));
app.use('/magnific', express.static(__dirname + '/node_modules/magnific-popup/dist/'));
// template engine, tell express to use jade as our template engine for view handling


// socket.on('connection', function(socket){
// 	console.log('a user connected');
// });

// =============================================================================
// Routes Config
// =============================================================================
router.get('/', function(req, res) {
	res.json({
		messages:'API'
	});
});

// Insert
router.post('/post', function(req, res) {
	var posts = new Posts();
	posts.title = req.body.title;
	// save
	posts.save(function(err, response){
		if(err){
			res.send(err);
		} else{
			res.json(response);
		}
	});
});

// Get specific
router.get('/post/:id', function(req, res){
	var posts_id = req.params.id;
	Posts.findById(posts_id, function(err, response) {
		if(err) {
			res.send(err);
		} else {
		    if (response == null) {
				res.status(404).send('Not found');
			} else {
				var json = JSON.stringify({ 
					response: response
				});
				res.end(json);
			}
		}
	});
});

// fetch all
router.get('/post/', function(req, res){
	Posts.find({}, function(err, response) {
		if(err) {
			res.send(err);
		} else {
		    if (response == null) {
				res.status(404).send('Not found');
			} else {
				var json = JSON.stringify({ 
					response: response
				});
				res.end(json);
			}
		}
	});
	 
});

// =============================================================================
// CONFIG
// =============================================================================
app.use('/api', router);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// START THE SERVER
// =============================================================================
var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});
