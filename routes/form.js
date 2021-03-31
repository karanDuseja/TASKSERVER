const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/formdb');
const bodyParser = require ('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json())

const formSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required : false
    },
    lastname: {
        type: String,
        required : false
     },
     
        middlename: {
            type: String,
        required : false
        },
        birthday: {
            type: Date,
        required : false
        },
        address:{
            type: String,
        required : false
        },
        mobile:{
            type: Number
        },
        state: {type: String},
        city:{
            type: String
        },
        zip:{
            type: Number
        },
        name:{
            type: String
        },
        originalName:{
            type: String
        },
        url: {type: String},
        height: {type: String},
        weight: {type: String},
        bloodgroup: {type: String},
        prefix: {type: String},
        marks: {type: String},
        total: {type: String},
        percentage: {type: String},
        age: {type: Number}
    

        });

        const Form = new mongoose.model("Form",formSchema);

        module.exports= Form;