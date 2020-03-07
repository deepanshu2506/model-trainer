var express = require('express');
var app = express();
var cors = require('cors')
var path = require('path');
var config = require('./config');
const mongoose = require('mongoose');
// const game = require('./model');
var bodyParser = require('body-parser');
const shortid = require('shortid');


app.use(bodyParser())

mongoose.connect(config.db_url,{useNewUrlParser:true},
    function(err, db) {
        if (err) console.log(err);
        ;
        console.log("Connected to database Successfully!");
      });

app.use(cors())