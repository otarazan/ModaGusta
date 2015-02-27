module.exports = (function() {
    'use strict';
    var router = require('express').Router();


    router.get('/', function(req, res) {
        res.header('Access-Control-Allow-Origin', "*");
        res.send('server works');

    });

    router.get('/test', function(req, res) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.json([{
            id: '1',
            image: 'img/pic2.png',
            title: 'So much grass #hippster'
        }, {
            id: '2',
            image: 'img/pic3.png',
            title: 'Way too much Sand, right?'
        }, {
            id: '3',
            image: 'img/pic4.png',
            title: 'Beautiful sky from wherever'
        }, {
            id: '1',
            image: 'img/pic2.png',
            title: 'So much grass #hippster'
        }]);
    });

    router.get('/buy', function(req, res) {
        res.json("bought id=" + req.query.id);


    });

    router.post('/sendWishListMail', function(req, res) {



        req.on('data', function(data) {
            var wishList=JSON.parse(data.toString()).wishList;
            console.log("Received mail data");

            //Prepare data in mail format
            var mail = "Your Wish List:<br>";
            for (i = 0; i < wishList.length; i++) {
                console.log(mail);
                mail += wishList[i].title + "<a href='#'><img height='60' width='60' src='http://localhost:8100/"+ wishList[i].image +"'/></a><br>";
            };
            console.log(mail);
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hus.alemdar@gmail.com',
                    pass: 'Naber123'
                }
            });
            transporter.sendMail({
                from: 'hus.alemdar@gmail.com',
                to: 'tarazansafak@gmail.com',
                subject: 'ModaGusta WishList',
                html: mail
            });
            res.json("ok");


        });

    });


    return router;
})();
