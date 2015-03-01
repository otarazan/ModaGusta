var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes/routes');
var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var app = express()
var mongoose = require('mongoose');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/modagusta');




//load all files in modes dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});



db.on('error', function(err) {
    console.log('connection error', err);
});
db.once('open', function() {

    var Schema = mongoose.Schema;
    var productsSchema = new Schema({
      id:String,
      title:String,
      image:String,
      productURL:String,
      gender:String,
      merchantCategory:String,
      cat1:String,
      cat2:String,
      cat3:String,
      des1:String,
      des2:String,
      des3:String,
      brandName:String,
      productModelName:String,
      oldPrice:String,
      newPrice:String,
      discountRate:String,
      city:String,
      startDate:String,
      endDate:String,
      shortTitle:String
    });

    var Product = mongoose.model('products',productsSchema);



    request('http://api.gelirortaklari.com/feed?id=7235&key=bc34a7f1f7a2bd5dff42e9708530e63f7164&page=1', function(error, response, body) {
            if (!error && response.statusCode == 200) {




                parseString(body, function(err, result) {

                    for (i = 0; i < result.products.product.length; i++) {

                        var discount = ((result.products.product[i].price - result.products.product[i].deal_price) / result.products.product[i].price) * 100;
                        var eachProduct = new Product({
                            "id": result.products.product[i].product_id,
                            "title": result.products.product[i].title,
                            "productURL": result.products.product[i].product_url,
                            "gender": result.products.product[i].gender,
                            "merchantCategory": result.products.product[i].merchant_category,
                            "cat1": result.products.product[i].category1,
                            "cat2": result.products.product[i].category2,
                            "cat3": result.products.product[i].category3,
                            "des1": result.products.product[i].description1,
                            "des2": result.products.product[i].description2,
                            "des3": result.products.product[i].description3,
                            "brandName": result.products.product[i].brand_name,
                            "modelName": result.products.product[i].model_name,
                            "oldPrice": result.products.product[i].price,
                            "newPrice": result.products.product[i].deal_price,
                            "discountRate": discount,
                            "city": result.products.product[i].city,
                            "startDate": result.products.product[i].start_date,
                            "endDate": result.products.product[i].end_date,
                            "shortTitle": result.products.product[i].short_title
                        });
                        eachProduct.save(function(err, fluffy) {
                            if (err) return console.error(err);

                            //console.log(i + "saved");

                        });

                        /*console.log(i);
                        request(result.products.product[i].product_url[0], function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                $ = cheerio.load(body);
                                eachProduct["image"] = $('#zoom1').attr('href');
                                console.log(eachProduct);


                            }
                        });*/




                    } // for

                }); //parse string body
            }
        }) // get all products from gelirortaklari




    console.log('connected.');
});


app.get('/users', function(req, res) {
    mongoose.model('users').find(function(err, users) {
        res.send(users);
    });
});

app.get('/posts', function(req, res) {
    mongoose.model('posts').find(function(err, posts) {
        res.send(posts);
    });
});


app.get('/posts/:userId', function(req, res) {
    mongoose.model('posts').find({
        user: req.params.userId
    }, function(err, posts) {
        mongoose.model('posts').populate(posts, {
            path: 'user'
        }, function(err, posts) {
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
