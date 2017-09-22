var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require("mongodb").MongoClient;
var mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/git_follow";

var GitHubApi = require("github");
var github = new GitHubApi({});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/followers/:user", function(req, res){
	var searchedUser = req.params.user;
	if(!searchedUser) return res.json({data:[]});
	github.users.getFollowingForUser({
		username: searchedUser
	}, function(err, followers) {
		github.users.getForUser({
			username: searchedUser
		}, function(err, foundUser){
			if(foundUser.data){
				foundUser = foundUser.data;
				mongo.connect(mongoUrl, function(err, db){
					var tempUser = {
						login:searchedUser,
						id:foundUser.id,
						avatar_url:foundUser.avatar_url,
						html_url:foundUser.html_url
					};
					db.collection("users").updateOne({login:searchedUser}, {$set: tempUser, $inc:{hits:1}}, {upsert:true}, function(err, operation){
						if(err){
							console.log(err);
						}
						db.close();
					});
				});
			}
			res.json(followers);
		});
	});
});

app.get("/popular/:n", function(req, res){
	console.log("Entered the popular route")
	var n = parseInt(req.params.n);
	mongo.connect(mongoUrl, function(err, db){
		if(err){
			console.log(err);
		}
		db.collection("users").find({}).sort({hits:-1}).limit(n).toArray(function(err, data){
			if(err){
				console.log(err);
			}
			db.close();
			res.json({data:data});
		});
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
