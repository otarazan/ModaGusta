var express = require('express')
var app = express()

app.get('/', function (req, res) {
   res.send('server works');
});

app.get('/test', function (req, res) {
   res.json([
    {id:'1', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'2', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'3', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
    {id:'5', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'6', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'7', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
    {id:'8', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'9', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'10', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
    {id:'11', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'12', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'13', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
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
