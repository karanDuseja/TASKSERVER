const mongoose = require('mongoose');


const bodyParser = require ('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json())

const arraySchema = new mongoose.Schema({

   
    code:{type: String} ,
    tags:[] ,
    qty: []

})

        const Array = new mongoose.model("arr",arraySchema);

        module.exports= Array;