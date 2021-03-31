const mongoose = require('mongoose');


const bodyParser = require ('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json())

const stateSchema = new mongoose.Schema({

    id:{ type: Number},
    name: {type: String}
    



})

        const State = new mongoose.model("state",stateSchema);

        module.exports= State;