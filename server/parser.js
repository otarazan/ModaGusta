module.exports = {
  parse: function () {
    console.log("SUPER");

var request = require('request');
var parseString = require('xml2js').parseString;

request('http://api.gelirortaklari.com/feed?id=7235&key=bc34a7f1f7a2bd5dff42e9708530e63f7164&offset=0&count=100', function (error, response, body) {
  if (!error && response.statusCode == 200) {




parseString(body, function (err, result) {

var a = JSON.stringify(result);
    console.log(a);
});



  }
})




}
};
