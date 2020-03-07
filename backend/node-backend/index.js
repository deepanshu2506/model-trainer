var express = require('express');
var app = express();
var cors = require('cors')
var path = require('path');
var config = require('./config');
const mongoose = require('mongoose');
// const game = require('./model');
var bodyParser = require('body-parser');
const shortid = require('shortid');
var Trainer = require('./model/trainer');

app.use(bodyParser())

mongoose.connect(config.db_url,{useNewUrlParser:true},
    function(err, db) {
        if (err) console.log(err);
        ;
        console.log("Connected to database Successfully!");
      });

app.use(cors())


app.post('/save',function(req,res){
  var name = req.body.name;
  var config = req.body.config;
  var modelstructure_url = req.body.modelstructure_url;
  var modelweights_url = req.body.modelweights_url;

  var newModel = {name: name,config: config,modelstructure_url: modelstructure_url,modelweights_url: modelweights_url};

  Trainer.create(newModel, function(err, newlyCreated){
    if(err){
      console.log(err);
    }else{
      console.log(newlyCreated);
    }
  });
});

app.get('/find', function(req,res){
  var modelId = req.body.id;

  Trainer.findById(modelId, function(err,foundModel){
    if(err){
      console.log(err);
    }else{
      console.log(foundModel);
    }
  });
});

app.post('/update',function(req,res){
  var name = req.body.name;
  var config = req.body.config;
  var modelstructure_url = req.body.modelstructure_url;
  var modelweights_url = req.body.modelweights_url;

  var updatedModel = {name: name,config: config,modelstructure_url: modelstructure_url,modelweights_url: modelweights_url};
  
  Trainer.findOneAndUpdate({_id: req.body.id},function(err,updateModel){
    if(err){
      console.log(err);
    } else{
      console.log(updateModel);
    }
  });
});


app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("model-trainer server Started");
});