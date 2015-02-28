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
// mongoose.connect("mongodb://localhost:27017/modagusta");
//mongoose.connection.on('error', function() {
//  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
//});


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/modagusta');

var db = mongoose.connection;

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {



var kittySchema = mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });



silence.save(function (err, fluffy) {
  if (err) return console.error(err);

  console.log("saved");







});

request('http://api.gelirortaklari.com/feed?id=7235&key=bc34a7f1f7a2bd5dff42e9708530e63f7164&offset=0&count=10', function (error, response, body) {
  if (!error && response.statusCode == 200) {




parseString(body, function (err, result) {

 //a = JSON.stringify(result);
 //console.log(result.products.product[2]);
    for (i = 0; i <result.products.product.length; i++) {
console.log(result.products.product[i]);
}

});
 }
})










console.log('connected.');
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


//var xmlparser = require('./parser.js');
//var data = xmlparser.parse();


var request = require('request');
var parseString = require('xml2js').parseString;
var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port





    console.log('Example app listening at http://%s:%s', host, port)

})
