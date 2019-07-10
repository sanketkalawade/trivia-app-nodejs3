const express = require('express');
const path = require('path');
const hbsForPartials = require('hbs');
const moment = require('moment');
const userModel = require('../model/models/userModel');
const historyModel = require('../model/models/historyModel');
const mongoose = require('mongoose');
require('../model/db/mongoose'); //to connect mongodb through mongoose


//define port and app express;
const app = express();
const PORT = process.env.PORT || 3000; // for local it will use 3000,if we deploy this app then it will use available port on server

//define different paths for view i.e for handle bars to configure express so express will use it.
 const publicDirPath = path.join(__dirname,'../presentation/public');
 const viewsToTemplatePath = path.join(__dirname,'../presentation/templates');
 const partialsPath = path.join(__dirname,'../presentation/partials');


 
//setup handlebar engine and views path
app.set('views',viewsToTemplatePath);
app.set('view engine','hbs');
hbsForPartials.registerPartials(partialsPath)
app.use(express.static(publicDirPath));

//create server
app.listen(PORT,()=>{
    console.log("server is up and running on "+PORT);
    
});

//defining these variables to access them in future.
let userName = null;
let questionOneAnswer = null;
let questionTwoAnswer = null;
let owner = null;

//configuring the express to convert all incoming request json to js object.
app.use(express.json())

//displaying first/welcome page api
app.get('',(req,res)=>{
    res.render('index');
})

//create user api
app.post('/user/create',async (req,res)=>{
    const currentDateTime = moment().format('YYYY-MM-DD hh:mm A')
    req.body.dateTime = currentDateTime;  
    userName = req.body.name;
    const user = new userModel(req.body);
    try {
        const oldUser = await userModel.find({name:userName})
        console.log("oldUser:- ");
        
        console.log(oldUser);
        
        if (oldUser.length > 0) {
            owner = oldUser[0];
            return res.redirect('/firstquestion');
        }else{
            owner =  await user.save();
            console.log("new user");
            console.log(owner);
            
            return res.redirect('/firstquestion');
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
    
    
})

//save the first question and answer
app.get('/firstquestion', (req,res)=>{
    res.render('firstquestion')
})

app.get('/secondquestion', (req,res)=>{
    questionOneAnswer = req.query.answer
    res.render('secondquestion');
    
})

app.post('/save',async (req,res)=>{
 console.log(questionOneAnswer);
 console.log(req.body);
 console.log(owner._id);
 
 questionTwoAnswer = req.body.secondquestionAnswer
 const answersToBothquestion = new historyModel({questionOneAnswer,questionTwoAnswer,owner:owner._id})

 try {
     await answersToBothquestion.save();
     console.log("history saved");
     
     return res.redirect('/summery')
 } catch (error) {
     res.send(error.message)
 }
 

 
})
//summery api
app.get('/summery',(req,res)=>{    
    //const stringId = owner._id.toString()
    
    console.log(typeof owner._id);
    
    res.render('summery',{userName,questionOneAnswer,questionTwoAnswer,ownerId: owner._id})
})

//show history api
app.get('/showHistory',async (req,res)=>{
    const ownerId = req.query.ownerId;
    const history = await historyModel.find({owner: mongoose.Types.ObjectId(ownerId)});
    res.render('history',{history})
})
