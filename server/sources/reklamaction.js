module.exports = (function() {
    'use strict';

    var mongoose = require('mongoose');
    var request = require('request');

    var db = mongoose.connection;




    db.once('open', function() {


        //  Product.find({}).remove().exec();

        // request('http://api.gelirortaklari.com/feed?id=7235&key=bc34a7f1f7a2bd5dff42e9708530e63f7164&page=1', function(error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //
        //             parseString(body, function(err, result) {
        //
        //                 for (i = 0; i < result.products.product.length; i++) {
        //
        //                     var discount = parseInt(((result.products.product[i].price - result.products.product[i].deal_price) / result.products.product[i].price) * 100);
        //
        //                     var eachProduct = {
        //                         "id": result.products.product[i].product_id,
        //                         "title": result.products.product[i].title,
        //                         "productURL": result.products.product[i].product_url,
        //                         "gender": result.products.product[i].gender,
        //                         "cat": result.products.product[i].category1,
        //                         "des": result.products.product[i].description1,
        //                         "brand": result.products.product[i].brand_name,
        //                         "oldPrice": result.products.product[i].price,
        //                         "newPrice": result.products.product[i].deal_price,
        //                         "discountRate": discount,
        //                     };
        //
        //                     request(result.products.product[i].product_url[0], function(error, response, body) {
        //                         if (!error && response.statusCode == 200) {
        //                             $ = cheerio.load(body);
        //                             eachProduct["image"] = $('#zoom1').attr('href');
        //
        //
        //
        //                             var tmpeachProduct = new Product({
        //                                 "id": eachProduct.id,
        //                                 "title": eachProduct.title,
        //                                 "productURL": eachProduct.productURL,
        //                                 "gender": eachProduct.gender,
        //                                 "cat": eachProduct.cat,
        //                                 "des": eachProduct.des,
        //                                 "brand": eachProduct.brand,
        //                                 "oldPrice": eachProduct.oldPrice,
        //                                 "newPrice": eachProduct.newPrice,
        //                                 "discountRate": eachProduct.discountRate,
        //                                 "image": eachProduct.image
        //                             });
        //
        //
        //                             tmpeachProduct.save(function(err, fluffy) {
        //                                 if (err) return console.error(err);
        //                                 console.log("saved" + i);
        //
        //                             });
        //
        //
        //                         }
        //                     });
        //
        //
        //
        //
        //                 } // for
        //
        //             }); //parse string body
        //         }
        //     }) // get all products from gelirortaklari


        request('http://feed.reklamaction.com/feed/get/json/7842dec1653e81a58787326784842b68', function(error, response, body) {
            Product.find({}).remove().exec();
            body = JSON.parse(body);
            //    console.log(body.Result.Products[1].ListPrice);
            for (var i = 0; i < body.Result.Products.length; i++) {
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

        console.log('reklamaction connected.');


    });

})();
