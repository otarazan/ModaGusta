module.exports = {
    parse: function() {
        console.log("SUPER");

        var request = require('request');
        var parseString = require('xml2js').parseString;
        var Product = mongoose.model('product', productsSchema);


        request('http://api.gelirortaklari.com/feed?id=7235&key=bc34a7f1f7a2bd5dff42e9708530e63f7164&offset=0', function(error, response, body) {
            if (!error && response.statusCode == 200) {


                parseString(body, function(err, productJson) {

                   console.log("olcay");
                   console.log(productJson);
                  /* var p = new Product({ name: 'Silence' });
                   p.save(function(err) {
                     // we've updated the dog into the db here
                     if (err) throw err;
                   });
                   */
                });
            }
        })



        return a;
    }
};
