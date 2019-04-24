var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://saurav28:saurav28@ds145916.mlab.com:45916/dbms-saurav";

var obj1 = 
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
}


var findUser = (aadhar) => {
    return new Promise((resolve,reject) => {
        console.log("Entered the promise");
                MongoClient.connect(url, function(err, db) {
                if (err) {
                    console.log("Error in connecting to DB")
                    reject(err);
                }
                var dbo = db.db("dbmsp");
                // var aadhno = parseInt(aadhar._id);
                var aadhno = aadhar._id;
                console.log(aadhno);
                dbo.collection("Personal").findOne({_id : aadhno},function(err,db6){
                    console.log("##ENTERED HERE##");
                    console.log(db6);
                    if(err)
                        reject(err);
                        var personalObject = db6;
                        console.log(personalObject);
                        dbo.collection("References").findOne({_id : aadhno},function(err,db1){
                            if(err)
                                reject(err);
                                var referenceObject = db1;
                            dbo.collection("Skills").findOne({_id : aadhno},function(err,db2){
                                if(err)
                                    reject(err);
                                    var skillObject = db2;
                                dbo.collection("Education").findOne({_id : aadhno},function(err,db3){
                                    if(err)
                                        reject(err);
                                        var educationObject = db3;
                                    dbo.collection("Interests").findOne({_id : aadhno},function(err,db4){
                                        if(err)
                                            reject(err);
                                        var interestObject = db4;
                                        dbo.collection("Work").findOne({_id : aadhno},function(err,db5){
                                            if(err)
                                                reject(err);
                                            var workObject = db5;
                                            var obj = 
                                            {
                                                fn : personalObject.fn,
                                                mn : personalObject.mn,
                                                ln : personalObject.ln,
                                                _id : personalObject._id,
                                                dob : personalObject.dob,
                                                location : personalObject.location,
                                                sex : personalObject.sex,
                                                phone : personalObject.phone,
                                                email : personalObject.email,
                                                nativelang : personalObject.nativelang,
                                                age : personalObject.age,
                                                network : personalObject.network,
                                                url : personalObject.url,
                                                username : personalObject.username,
                                                degree : educationObject.degree,
                                                cgpa  : educationObject.cgpa,
                                                yog : educationObject.yog,
                                                Name : skillObject.Name,
                                                Level : skillObject.Level,
                                                Keywords : skillObject.Keywords,
                                                Achievement : skillObject.Achievement,
                                                InterestName : interestObject.Name,
                                                InterestKeywords : interestObject.Keywords,
                                                referenceName : referenceObject.Name,
                                                reference : referenceObject.reference,
                                                company: workObject.company,
                                                position: workObject.position,
                                                website: workObject.website,
                                            }
                                            console.log("############################")
                                            console.log(obj);
                                            console.log("############################")
                                            resolve(obj);
                        })
                    })
                })
            })
        })
    })  
    })
})}

module.exports = findUser;