var express = require('express')
var app = express()

app.get('/', function (req, res) {
res.header('Access-Control-Allow-Origin', "*");
   res.send('server works');
   
});

app.get('/test', function (req, res) {
	res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
   res.json([
    {id:'1', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'2', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'3', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
    {id:'1', image: 'img/pic2.png', title: 'So much grass #hippster'}
    ]);
});

app.get('/buy', function (req, res) {
    res.json("bought id="+req.query.id);
});



var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  
  console.log('Example app listening at http://%s:%s', host, port)

})


