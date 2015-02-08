var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var secrets = require('../config/secrets');



/**
* GET /account
* Profile page.
*/
exports.test = function(req, res) {
  res.json([
    {id:'1', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'2', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'3', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
    {id:'5', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'6', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'7', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
    {id:'8', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'9', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'10', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
    {id:'11', image: 'img/pic2.png', title: 'So much grass #hippster'},
    {id:'12', image: 'img/pic3.png', title: 'Way too much Sand, right?'},
    {id:'13', image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
    ]);
};

exports.buy = function(req, res) {
  res.json("bought id="+req.query.id);
  };
