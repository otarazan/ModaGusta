
var mongoose = require('mongoose');

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
