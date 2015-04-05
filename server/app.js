var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes/routes');
var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var async = require("async");
var nodemailer = require('nodemailer');


var db = mongoose.connection;



var fs = require('fs');
fs.readFile('file.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(i in array) {
     //   console.log(array[i]);
    }
});


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
    id: String,
    title: String,
    productURL: String,
    gender: Boolean,
    providerName: String,
    cat: String,
    desc: String,
    brand: String,
    oldPrice: Number,
    newPrice: Number,
    discountRate: String,
    image: String
});

var Product = mongoose.model('products', productsSchema);


var fs = require('fs');
var allProductUrl = fs.readFileSync('file.txt').toString().split("\n");

db.once('open', function() {


      Product.find({}).remove().exec();


	  for(k = 0; k<allProductUrl.length;k++){
    request(allProductUrl[k], function(error, response, body) {


            if (!error && response.statusCode == 200) {

                parseString(body, function(err, result) {


                  var q = async.queue(function (product, done) {
                    request(product.productURL, function(error, response, body) {
                        //We try to get pic
                        if (!error && response.statusCode == 200) {
                              $ = cheerio.load(body);
                              //get Image
                              product.image = $('#Zoomer').attr('href');

                          //    console.log($('#Zoomer').attr('href'));

                              //console.log($('#Zoomer').attr('href'));

                              if (product.image ==null) {
                                  //return; //this shouldnt happen
                              }

                              //Save the product
                              product.save(function(err, fluffy) {
                                if (err) return console.error(err);
                               // console.log("saved :" + JSON.stringify(product));
                              });
                        }
                        done();
                    });
                  }, 5);



                    for (i = 0; i <result.products.product.length; i++) {
                      var discount = parseInt(((result.products.product[i].price - result.products.product[i].deal_price) / result.products.product[i].price) * 100);
                      var catArr  = result.products.product[i].category1[0].split('&gt;');
                      var cat = catArr[catArr.length -1].trim();

                      var eachProduct = new Product({
                           "id": result.products.product[i].product_id,
                           "title": result.products.product[i].title,
                           "productURL": result.products.product[i].product_url[0],
                           "gender": result.products.product[i].gender,
                           "providerName" :result.products.product[i].provider_name[0],
                           "cat": cat,
                           "des": result.products.product[i].description1,
                           "brand": result.products.product[i].brand_name,
                           "newPrice": parseInt(result.products.product[i].price),
                           "oldPrice": parseInt(result.products.product[i].deal_price),
                           "discountRate": discount,
                           "image" : ''

                      });
                      q.push(eachProduct );


                    } // for

                }); //parse string body
            }
        }) // get all products from gelirortaklari

	  }


   /*  request('http://feed.reklamaction.com/feed/get/json/7842dec1653e81a58787326784842b68', function(error, response, body) {
        Product.find({}).remove().exec();
        body = JSON.parse(body);
        //    console.log(body.Result.Products[1].ListPrice);
        for (i = 0; i < body.Result.Products.length; i++) {
            var discount = parseInt(((body.Result.Products[i].ListPrice - body.Result.Products[i].SalePrice) / body.Result.Products[i].ListPrice) * 100);
            var eachProduct = new Product({
                "id": body.Result.Products[i].Code,
                "title": body.Result.Products[i].Title,
                "productURL": body.Result.Products[i].URL,
                "gender": body.Result.Products[i].Gender,
                "cat": body.Result.Products[i].MainCategory,
                "des": body.Result.Products[i].FullDesc,
                "brandName": null,
                "oldPrice": body.Result.Products[i].ListPrice,
                "newPrice": body.Result.Products[i].SalePrice,
                "discountRate": discount,
                "image": body.Result.Products[i].Images
            });
            eachProduct.save(function(err, fluffy) {
                if (err) return console.error(err);

                console.log(i);
            });

            // console.log(eachProduct);
        } //for

    }); // get reklamaction products

    console.log('connected.'); */


});


app.get('/product/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var p = Product.find({
        id: req.params.id
    });
    Product.findOne({
        id: req.params.id
    }, function(err, product) {
        if (err) return console.error(err);
        res.json(product);
    });
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/filter', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var selections = req.body;
    //find requested selections
   //console.log("filter request recieved:" + JSON.stringify(selections));

   //find min and max requested price
   var min = Math.min(selections.price.maxPrice, selections.price.minPrice);
   var max = Math.max(selections.price.maxPrice, selections.price.minPrice);
   //set min and max
   selections.price.maxPrice=max;
   selections.price.minPrice=min;

    Product.find({"gender":selections.gender.id,
                        "cat":selections.cat.id,
                        "providerName":selections.provider.id,
                        "newPrice": { $lt: selections.price.maxPrice, $gt: selections.price.minPrice },
                  }, {}, {
        skip:selections.ofset,
        limit: 10
    }, function(err, product) {
        if (err) return console.error(err);
      //  console.log(product);
        res.json(product);
    });
});


app.post('/getAll', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    Product.find({}, {}, {
        limit: 10
    }, function(err, product) {
        if (err) return console.error(err);
    //  console.log(product);
        res.json(product);
    });
});

app.get('/menu', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var selections = req.body;

    var cats;

    Product.find().distinct('cat', function(error, categories) {
        Product.find().distinct('providerName', function(error, providers) {

              Product.find().distinct('discountRate', function(error, discountRate) {
                     var result = {
                       'cat':categories,
                       'providers':providers,
                       'discountRate':discountRate
                     };
                     res.json(result);
             });//products
        }); //providers

    }); //caregories
});

app.post('/sendWishListMail', function(req, res) {
 process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var wishList = req.body.wishList;
var mailTo = req.body.mailTo;
  var mail = "Your Wish List:<br>";
        for (i = 0; i < req.body.wishList.length; i++) {
            mail += wishList[i].title +" "+ wishList[i].newPrice +" TRY"+ "<a href='"+wishList[i].productURL+"'><img height='60' width='60' src='"+wishList[i].image+"'/></a><br>";
        };

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test@modagusta.com',
                pass: 'Naber123'
            }
        });
        transporter.sendMail({
            from: 'test@modagusta.com',
            to: mailTo,
            subject: 'ModaGusta Your WishList ✔',
            html: mail
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

app.set('port', (process.env.PORT || 3000));

var parseString = require('xml2js').parseString;
var server = app.listen(app.get('port'), function() {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})
