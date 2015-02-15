var express = require('express')
var app = express()


// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.send('server works');

});

app.get('/test', function(req, res) {
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

app.get('/buy', function(req, res) {
    res.json("bought id=" + req.query.id);


});

app.post('/sendWishListMail', function(req, res) {



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
            to: 'olcaytarazan@gmail.com',
            subject: 'ModaGusta WishList',
            html: mail
        });
        res.json("ok");


    });

});

var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port



    console.log('Example app listening at http://%s:%s', host, port)

})
