var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes/routes');
var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/modagusta');

//load all files in modes dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});



db.on('error', function(err) {
    console.log('connection error', err);
});


var Schema = mongoose.Schema;
var productsSchema = new Schema({
      id:String,
      title:String,
      image:String,
      productURL:String,
      gender:Boolean,
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


db.once('open', function() {


//    Product.find({}).remove().exec();
//
//    request('http://api.gelirortaklari.com/feed?id=7235&key=bc34a7f1f7a2bd5dff42e9708530e63f7164&page=1', function(error, response, body) {
//            if (!error && response.statusCode == 200) {
//
//                parseString(body, function(err, result) {
//
//                    for (i = 0; i < result.products.product.length; i++) {
//
//                        var discount = ((result.products.product[i].price - result.products.product[i].deal_price) / result.products.product[i].price) * 100;
//                        var eachProduct = new Product({
//                            "id": result.products.product[i].product_id,
//                            "title": result.products.product[i].title,
//                            "productURL": result.products.product[i].product_url,
//                            "gender": result.products.product[i].gender,
//                            "merchantCategory": result.products.product[i].merchant_category,
//                            "cat1": result.products.product[i].category1,
//                            "cat2": result.products.product[i].category2,
//                            "cat3": result.products.product[i].category3,
//                            "des1": result.products.product[i].description1,
//                            "des2": result.products.product[i].description2,
//                            "des3": result.products.product[i].description3,
//                            "brandName": result.products.product[i].brand_name,
//                            "modelName": result.products.product[i].model_name,
//                            "oldPrice": result.products.product[i].price,
//                            "newPrice": result.products.product[i].deal_price,
//                            "discountRate": discount,
//                            "city": result.products.product[i].city,
//                            "startDate": result.products.product[i].start_date,
//                            "endDate": result.products.product[i].end_date,
//                            "shortTitle": result.products.product[i].short_title
//                        });
//                         eachProduct.save(function(err, fluffy) {
//                            if (err) return console.error(err);
//
//                            console.log(i + ". product saved");
//
//                        });
//                        console.log(i + "saved");
//                        /*console.log(i);
//                        request(result.products.product[i].product_url[0], function(error, response, body) {
//                            if (!error && response.statusCode == 200) {
//                                $ = cheerio.load(body);
//                                eachProduct["image"] = $('#zoom1').attr('href');
//                                console.log(eachProduct);
//
//
//                            }
//                        });*/
//
//
//
//
//                    } // for
//
//                }); //parse string body
//            }
//        }) // get all products from gelirortaklari


request('http://feed.reklamaction.com/feed/get/json/5e86db9c580f775df52e6e73a13afada', function(error, response, body) {
        //   if (!error && response.statusCode == 200) {}
        body = JSON.parse(body);
    //    console.log(body.Result.Products[1].ListPrice);
         for (i = 0; i < body.Result.Products.length; i++){
                    var discount = ((body.Result.Products[i].ListPrice - body.Result.Products[i].SalePrice) / body.Result.Products[i].ListPrice) * 100;
                    var eachProduct = new Product({
                                                "id": body.Result.Products[i].Code,
                                                "title": body.Result.Products[i].Title,
                                                "productURL": body.Result.Products[i].URL,
                                                "gender": body.Result.Products[i].Gender,
                                                "merchantCategory": body.Result.Products[i].MainCategory,
                                                "cat1": body.Result.Products[i].ChildrenCategory,
                                                "cat2": null,
                                                "cat3": null,
                                                "des1": body.Result.Products[i].FullDesc,
                                                "des2": body.Result.Products[i].ShortDesc,
                                                "des3": body.Result.Products[i].description3,
                                                "brandName": null,
                                                "modelName": null,
                                                "oldPrice": body.Result.Products[i].ListPrice,
                                                "newPrice": body.Result.Products[i].SalePrice,
                                                "discountRate": discount,
                                                "city": null,
                                                "startDate": null,
                                                "endDate": null,
                                                "shortTitle": body.Result.Products[i].short_title,
                                                "image": body.Result.Products[i].Images

                                            });
                                             eachProduct.save(function(err, fluffy) {
                                                if (err) return console.error(err);

                                                //console.log(i + ". product saved");

                                            });
                                           //  console.log(i + "saved");
console.log(eachProduct.image);

        }//for











}); // get reklamaction products












//var options = {
//  uri: 'http://private-anon-375fa4c77-reklamactionfeed.apiary-proxy.com/restapi/account/login',
//  method: 'POST',
//  json: {
//      "login": "tarazansafak@gmail.com",
//       "password": "Naber123"
//  }
//};
//
//request(options, function (error, response, body) {
//  if (!error && response.statusCode == 200) {
//    console.log(body) // Print the shortened url.
//
//
//
//
//
//
//        request('http://private-anon-e3b27c9a4-reklamactionfeed.apiary-proxy.com/restapi/products?accessToken=' + body , function(error, response, body) {
//                    if (!error && response.statusCode == 200) {
//
//                      //  parseString(body, function(err, result) {
//
//                             console.log(body);
//
//                      //   }); //parse string body
//
//                      }
//
//                      console.log(error);
//
//          });
//
//}
//
//}); //get reklamaction token

//$.ajax({
//  type: "POST",
//  url: "http://private-anon-375fa4c77-reklamactionfeed.apiary-proxy.com/restapi/account/login",
//  data: "{\"login\":\"nihan.meral@adsalsagroup.com\",\"password\":\"tradsalsa4\"}",
//  success: function(data, status, headers, config) {
//           console.log("reklamaction is ok");
//            },
//
// fail:  function(data, status, headers, config) {
//            console.log("reklamaction fail result: " + status);
//         }
//});


    console.log('connected.');
});


app.get('/product/:id', function(req, res) {
  var p  = Product.find({id:req.params.id});
  Product.findOne({
            id: req.params.id
        }, function(err, product) {
            if (err) return console.error(err);
            res.json(product);
   });
});


app.get('/product/gender/:gender', function(req, res) {

  Product.find({
        gender:req.params.gender
        }, function(err, product) {
            if (err) return console.error(err);
            res.json(product);
   });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/filter', function(req, res, next) {
  var selections= req.body;
  console.log(req.body);
  res.send(req.body);
});


/*app.get('/product/:key/:value', function(req, res) {
    var key = req.params.key;
    var obj = {
        key: req.params.value
    };
    Product.find({
        key: req.params.value
    }, function(err, product) {
        if (err) return console.error(err);
        res.json(product);
    });
});*/



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
