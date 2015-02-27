module.exports = {
  parse: function () {
    console.log("hello");


    var http = require('http');
    var fs = require('fs');
    var parser = require('xml2json');
    //var parseString = require('xml2js').parseString;



    var xml = "<foo>bar</foo>";


    var xml2js = require('xml2js')


    var url='http://api.gelirortaklari.com/feed?id=7235&key=bc34a7f1f7a2bd5dff42e9708530e63f7164&offset=0&count=10';
    var req = http.get(url, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(xml){
        var parser = new xml2js.Parser({strict: false});
        xml="<products> <product>  <product_id>81776629</product_id>  <pid>issimo-shoes-kirmizi-ayakkabi-dk21101</pid>  <product_url>  http://tr.rdrtr.com/aff_c?offer_id=349&aff_id=7388&aff_sub=iframe&url=http%3A%2F%2Fwww.zizigo.com%2Fissimo-shoes-kirmizi-ayakkabi-dk21101&source=axml  </product_url>  <title>İssimo Shoes DK-21101</title>  <image/>  <description1>Ücretsiz Kargo</description1>  <description2>365 Gün İade</description2>  <description3/>  <provider_name>Zizigo</provider_name>  <model_name/>  <brand_name>İssimo Shoes</brand_name>  <merchant_category>Ayakkabı</merchant_category>  <category1>Ayakkabı</category1>  <category2/>  <category3/>  <price>87.48</price>  <deal_price>29.99</deal_price>  <discount/>  <city/>  <gender>0</gender>  <start_date>0</start_date>  <end_date>0</end_date>  <short_title/>  </product>  <product>  <product_id>81776630</product_id>  <pid>issimo-shoes-kirmizi-ayakkabi-ma004</pid>  <product_url>  http://tr.rdrtr.com/aff_c?offer_id=349&aff_id=7388&aff_sub=iframe&url=http%3A%2F%2Fwww.zizigo.com%2Fissimo-shoes-kirmizi-ayakkabi-ma004&source=axml  </product_url>  <title>İssimo Shoes MA-004</title>  <image/>  <description1>Ücretsiz Kargo</description1>  <description2>365 Gün İade</description2>  <description3/>  <provider_name>Zizigo</provider_name>  <model_name/>  <brand_name>İssimo Shoes</brand_name>  <merchant_category>Ayakkabı</merchant_category>  <category1>Ayakkabı</category1>  <category2/>  <category3/>  <price>174.98</price>  <deal_price>70.01</deal_price>  <discount/>  <city/>  <gender>0</gender>  <start_date>0</start_date>  <end_date>0</end_date>  <short_title/>  </product>  <product>  <product_id>81776631</product_id>  <pid>issimo-shoes-kirmizi-ayakkabi-x3026</pid>  <product_url>  http://tr.rdrtr.com/aff_c?offer_id=349&aff_id=7388&aff_sub=iframe&url=http%3A%2F%2Fwww.zizigo.com%2Fissimo-shoes-kirmizi-ayakkabi-x3026&source=axml  </product_url>  <title>İssimo Shoes X-3026</title>  <image/>  <description1>Ücretsiz Kargo</description1>  <description2>365 Gün İade</description2>  <description3/>  <provider_name>Zizigo</provider_name>  <model_name/>  <brand_name>İssimo Shoes</brand_name>  <merchant_category>Ayakkabı</merchant_category>  <category1>Ayakkabı</category1>  <category2/>  <category3/>  <price>149.98</price>  <deal_price>30.00</deal_price>  <discount/>  <city/>  <gender>0</gender>  <start_date>0</start_date>  <end_date>0</end_date>  <short_title/>  </product></products>";
        parser.parseString(xml, function (err, result) {
            console.log(result);
        });
     });
    });

  },
  bar: function () {
    // whatever
  }
};
