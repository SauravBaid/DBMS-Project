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

var addUser = (obj) => {
    console.log("It entered add USer");
    return new Promise((resolve,reject) => {
        console.log("Entered the promise");
                MongoClient.connect(url, function(err, db) {
                if (err) {
                    console.log("Error in connecting to DB")
                    reject(err);
                }
                var dbo = db.db("dbmsp");
                var personalObject = {
                    _id : obj._id,
                    fn : obj.fn,
                    mn : obj.mn,
                    ln : obj.ln,
                    dob : obj.dob,
                    age : obj.age,
                    sex : obj.sex,
                    location : obj.location,
                    phone : obj.phone,
                    email : obj.email,
                    nativelang  : obj.nativelang,
                    network : obj.network,
                    url : obj.url,
                    username : obj.username
                };

                var educationObject = {
                    _id : obj._id,
                    degree : obj.degree,
                    cgpa  : obj.cgpa,
                    yog : obj.yog,
                };

                var skillsObject = {
                    _id : obj._id,
                    Name : obj.Name,
                    Level : obj.Level,
                    Keywords : obj.Keywords,
                    Achievement : obj.Achievement
                }

                var interestObject = {
                    _id : obj._id,
                    Name : obj.InterestName,
                    Keywords : obj.InterestKeywords
                }

                var workObject = {
                    _id : obj._id,
                    company: obj.company,
                    position: obj.position,
                    website: obj.website
                }

                var referenceObject = {
                    _id : obj._id,
                    name : obj.referenceName,
                    reference : obj.reference
                }

                dbo.collection("Personal").insertOne(personalObject , function(err,db){
                    if(err) 
                        reject(err);
                        dbo.collection("Skills").insertOne(skillsObject,function(err,db){
                            if(err)
                                reject(err);
                            dbo.collection("Education").insertOne(educationObject,function(err,db){
                                if(err)
                                    reject(err);
                                dbo.collection("Interests").insertOne(interestObject,function(err,db){
                                    if(err)
                                        reject(err);
                                    dbo.collection("Work").insertOne(workObject,function(err,db){
                                        if(err)
                                            reject(err);
                                            dbo.collection("Reference").insertOne(referenceObject,function(err,db){
                                                if(err)
                                                    reject(err);
                                                resolve("Successfully added");
                                    })
                                })
                            })
                        })
                    })    
    })
})
})}

module.exports = addUser;