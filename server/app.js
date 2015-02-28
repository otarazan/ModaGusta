var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes/routes');
var fs = require('fs');


/**
 * Create Express server.
 */
var app = express()

/**
 * Connect to MongoDB.
 */
 mongoose.connect("mongodb://localhost:27017/modagusta");
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});



//load all files in modes dir
fs.readdirSync(__dirname+'/models').forEach(function(filename){
  if(~filename.indexOf('.js')) require(__dirname+'/models/'+ filename)
});


app.get('/users', function(req,res){
  mongoose.model('users').find(function(err,users){
    res.send(users);
  });
});

app.get('/posts', function(req,res){
  mongoose.model('posts').find(function(err,posts){
    res.send(posts);
  });
});


app.get('/posts/:userId', function(req,res){
  mongoose.model('posts').find({user:req.params.userId},function(err,posts){
    mongoose.model('posts').populate(posts,{path:'user'},function(err,posts){
      res.send(posts);
    })
  });
});



// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/', routes);


var xmlparser = require('./parser.js');
xmlparser.parse();


var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port



    console.log('Example app listening at http://%s:%s', host, port)

})
