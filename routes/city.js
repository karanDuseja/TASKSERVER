const mongoose = require('mongoose');


const bodyParser = require ('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json())

const citySchema = new mongoose.Schema({

    id:{ type: Number},
    state_id:{type: Number},
    name: {type: String}
    



})

        const City = new mongoose.model("city",citySchema);

        module.exports= City;