var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var addUser = require('./models/addUser');
var findUser = require('./models/findUser');
var updateUser = require('./models/updateUser');
var getPersonal = require('./models/getPersonal');

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
const PORT = process.env.PORT || 3000

var obj = 
{
    fn : "",
    mn : "",
    ln : "",
    _id : "",
    dob : "",
    location : "",
    sex : "",
    phone : "",
    email : "",
    nativelang : "",
    age : "",
    network : "",
    url : "",
    username : "",
    degree : "",
    cgpa  : "",
    yog : "",
    //skills
    Name : "",
    Level : "",
    Keywords : "",
    Achievement : "",
    InterestName : "",
    InterestKeywords : "",
    referenceName : "",
    reference : "",
    company: "",
    position:"",
    website: "",
    submitbutton : "Save"
}

app.get('/',function(req,res){
    res.render('home');
})
app.get('/admin1',function(req,res){
    res.render('admin1');
})

app.get('/admin2',function(req,res){
    res.render('admin2');
})
app.get('/page2',function(req,res){
    res.render('page2');
})

app.get('/newform',function(req,res){
    res.render('newform',obj);
})

app.post('/newform',function(req,res){

    var obj = req.body;
    console.log(obj);
    if(obj["submitbutton"] == "Save")
    {
    addUser(obj)
    .then(result => {
        console.log(result);
        res.render("page2");
    })
    .catch(err => {
        console.log("Error here");
        console.log(err);
        res.send("Failed to add User");
    })
    }
    else if(obj["submitbutton"] == "Update")
    {
        console.log("Entered the update section")
        updateUser(obj)
        .then(result => {
            console.log(result);
            res.render("page2");
        })
        .catch(err => {
            console.log(err);
            res.send("Error updating")
        })
    }
});

app.get('/aadhar',function(req,res){
    res.render("aadhar",{error : ""});
})


app.post('/existinguser',function(req,res){
    console.log(req.body);
    findUser(req.body)
    .then(result => {
        console.log("Finding works");
        result["submitbutton"] = "Update";
        console.log(result);
        res.render('newform',result);
    })
    .catch(err => {
        res.send("ERROR")
    })
    // res.render("newform",obj);
})

app.get('/getall',function(req,res){
    getPersonal()
    .then(result => {
        console.log(result)
        res.json(result);
    })
    .catch(err => {
        console.log(err)
        res.json({err : "Error"})
    })
})

app.post('/finduser1',function(req,res){
    console.log(req.body);
    var newVal = parseInt(req.body.aadno);
    var newObj = {_id : newVal};
    findUser(newObj)
    .then((result) => {
        res.render('finalrender',result)
        console.log(result);
    })
    .catch(err => {
        console.log(err);
        res.send("error")
    })
})

app.listen(PORT, function(){
    console.log("Server is running at port 3000");
});