var mongoose = require('mongoose');
const shortid = require('shortid');
var Schema = mongoose.Schema;

var trainerSchema = new Schema({
    _id: {type: String, default: shortid.generate, required: true},
    name: {type: String, required: true},
    config: {type: Object, required: true},
    modelstructure_url: {type: String, required: true},
    modelweights_url: {type: String, required: true}
});