var express = require('express');
var router = express.Router();
// const Form = require('./routes/form');
const mongoose = require('mongoose');
const multer = require('multer');
const Form = require('./form');
const cors = require('cors');
const Images = require('./image');
const path = "C:/Users/admin/formserver/public/images"
const State = require("./state");
const City = require("./city");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/savedata', function(req, res){
  console.log(req);
  
 
  var myData =  req.body;
  var data={
    firstname:myData.data.firstname,
  lastname:myData.data.lastname,
   
      middlename: myData.data.middlename,
      birthday: myData.data.birthday,
      address:myData.data.address,
      mobile:myData.data.mobile,
      city:myData.data.city,
      state:myData.data.state,
      zip:myData.data.zip,
      marks:myData.data.marks,
      total:myData.data.total,
      percentage:myData.data.percentage,
      prefix:myData.data.prefix,
      bloodgroup:myData.data.bloodgroup,
      height:myData.data.height,
      weight:myData.data.weight,
      age:myData.data.age,
      // originalName:
      url:myData.image
  

      
  }
  const newData = new Form(data);
  
  newData.save()
  .then(item => {
    
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send(err);
  console.log(err)
  })
});

router.get('/formdata', function(req,res){
  Form.find({})
  .exec(function(err,forms){
    if(err){
      console.log('err')

    } else {
      res.json(forms);
    }
  });
});
router.post('/delete', function(req,res){
  console.log(req.body)
  Form.remove({_id:mongoose.Types.ObjectId(req.body.id)})
  .exec(function(err,forms){
    if(err){
      console.log('err')

    } else {
      res.json(forms);
    }
  });
});
router.post('/update', function(req,res){
  console.log(req.body)
 
  Form.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.body.id)},

 {$set: {firstname: req.body.firstname,
        lastname : req.body.lastname,
        middlename : req.body.middlename,
        birthday : req.body.birthday,
        city : req.body.city,
        state : req.body.state,
        mobile: req.body.mobile,
        zip: req.body.zip,
        url: req.body.image
      
      
      
      
      } ,  

},
 function (err, doc) {

  if(err){
    console.log('err')

  } else {
    res.send(doc)
    console.log(doc);
  }
  
});
})
router.get('/getdataid/:id', function(req,res){
  console.log(req.params)

  Form.find({_id:mongoose.Types.ObjectId(req.params.id)})
  .exec(function(err,forms){
    if(err){
      console.log('err')

    } else {
      res.send(forms)
      console.log(forms);
    }
  });
});
const storage = multer.diskStorage({
  destination: (req,file,callBack)=> {
    
    callBack(null, path)
  },
  filename: (req, file, callBack)=>{
    

    callBack(null, `name_${file.originalname}`)
  }
})

var upload = multer({storage: storage});

router.post('/uploadimage',upload.array('files'),(req, res, next)=>{
  try{
    console.log(req.files);
  for(var i=0;i< req.files.length;i++){
    var data = {
      name:req.files[i].filename,
    url:'http://localhost:3000/'+ req.files[i].filename,
    originalName:req.files[i].originalname
    
    }
    const imageData = new Images(data);
    imageData.save(function(err,resp){
      if(err){
        res.send(err)
      }else{
        res.send(resp)
      }
    })
  }
  
    
  }catch(err){
    console.log("jjjjjjjjjjjjjjjjj",err)
  }
})
router.get("/displayimage", function(req,res){
  Images.find({})
  .exec(function(err,images){
    if(err){
      console.log('err')

    } else {
      res.send(images);
    }
})
})

router.get("/getstate", function(req,res){
  State.find({})
  .exec(function(err,states){
    if(err){
      console.log('err')

    } else {
      res.send(states);
    }})
  })
router.get("/getcity/:id", function(req,res){
  City.find({state_id:req.params.id})
  .exec(function(err,cities){
    if(err){
      console.log('err')

    } else {
      res.send(cities);
    }})
  })

  router.post("/uniquevalidation", function(req,res) {
  console.log("unique", req.body.data)
  Form.find({firstname: req.body.data})
  .exec(function (err,response){
    if(response.length!=0){
      console.log("fn", response)
      // if(response[0].firstname==req.body.data){
        res.send({text:"User already exists "})
        console.log("exists already")
  
      // } else {
      //   console.log('error unique',err)
      // }
    }else{
      res.send()
    }
  })
    
  }),


 

module.exports = router;

function saveState(){
 var array= [
  { id: 1,  name: 'Maharashtra' },
  { id: 2,  name: 'Goa' },
  { id: 3,  name: 'Rajasthan' },
  { id: 4,  name: 'Punjab' }
 
  ]
    for(var i=0;i<array.length;i++){
      const savedata = new State(array[i])
      savedata.save()
    }
  
}
function saveCity(){
  var array= [
    { id: 1, state_id: 1, name: 'Mumbai' },
    { id: 2, state_id: 1, name: 'pune' },
    { id: 3, state_id: 1, name: 'Thane' },
    { id: 4, state_id: 1, name: 'nashik' },
    { id: 5, state_id: 2, name: 'Panaji' },
    { id: 6, state_id: 2, name: 'Agonda' },
    { id: 7, state_id: 2, name: 'Anjuna' },
    { id: 8, state_id: 2, name: 'Arambol' },
    { id: 9, state_id: 3, name: 'Jaipur' },
    { id: 10, state_id: 3, name: 'Jodhpur' },
    { id: 11, state_id: 3, name: 'Kota' },
    { id: 12, state_id: 4, name: '	Lahore' },
    { id: 13, state_id: 4, name: 'Faisalabad' },
    { id: 14, state_id: 4, name: 'Amritsar' }
  
   ]
     for(var i=0;i<array.length;i++){
       const citydata = new City(array[i])
       citydata.save()
     }
   
 }
// saveCity();
// saveState();

 async function  getDocument()  {
  const result = await Form.find({birthday : {'$gt': ('2013-01-06T04:56:44.000Z'), '$lt': ('2020-01-06T04:56:44.000Z')}});
  // console.log(result)
  const result1 = await Form.find({age : {$gt: 0}});
  // console.log("kkkkkkk", result1)
  
  const result2 = await Form.find({birthday : {'$ne': ('2015-02-02T04:56:44.000Z') }});

  // console.log(result2)
  const result3 = await Form.find({state : {'$nin': ('1') }});

  // console.log(result3)
  const result4 = await Form.find({state : {'$in': ['1', '2'] } });

  // console.log(result4)
  const result5= await Form.find({$and: [{state : {'$in': ['1', '2'] }}, {'age': { '$lt': '7'}} ]  });

  // console.log(result5)
  const result6= await Form.find({$or: [{state : {'$in': ['1', '2'] }}, {'age': { '$lt': '7'}} ]  });

  // console.log(result6)
  const result7= await Form.find({$nor: [{state : {'$in': ['1', '2'] }}, {'age': { '$lt': '7'}} ]  });

  // console.log(result7)
  const result8= await Form.find({state :  {$not: RegExp( '1') }} );

  // console.log(result8)


  const result9= await Form.find( { height: { $exists: false } } )
  // console.log("ssss",result9)
  const result10= await Form.find( { "birthday" : { $type : [ "date" ] } } );
  // console.log("ssss",result10)
  const result11= await Form.find( { firstname: { $regex: /^k/i} } )
  // console.log("ssss",result11)

  const result12= await Form.find( { $expr: { $lt: [ "$age" , "$percentage" ] } } )

  // console.log("ssss",result12)

  const result13= await Form.find( { mobile: { $mod: [ 2, 0 ] } } )
  // console.log("ssss",result13)

  const result14= await Form.find(   ).sort( { age: -1 } )
  //  console.log("ssss",result14)
  // const result15= await Form.find( "$orderby", { age: -1 } )
  //  console.log("ssss",result15)



  // const result16= await Form.find({ $currentDate: { 'firstname' : Date} })
  // console.log("ssss",result16)

 }

  getDocument()
