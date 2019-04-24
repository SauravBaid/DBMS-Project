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

var updateUser = (obj) => {
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

                var personalSet = {
                    $set : personalObject
                }
                var educationSet = {
                    $set : educationObject
                }
                var skillsSet = {
                    $set : skillsObject
                }
                var interestSet = {
                    $set : interestObject
                }
                var workSet = {
                    $set : workObject
                }
                var referenceSet = {
                    $set : referenceObject
                }
                dbo.collection("Personal").updateMany({_id : obj._id}, personalSet,function(err,db){
                    if(err) 
                        reject(err);
                        console.log("Updated Personal correctly")
                        dbo.collection("Skills").updateMany({_id : obj._id},skillsSet,function(err,db){
                            if(err)
                                reject(err);
                            dbo.collection("Education").updateMany({_id : obj._id},educationSet,function(err,db){
                                if(err)
                                    reject(err);
                                dbo.collection("Interests").updateMany({_id : obj._id},interestSet,function(err,db){
                                    if(err)
                                        reject(err);
                                    dbo.collection("Work").updateMany({_id : obj._id},workSet,function(err,db){
                                        if(err)
                                            reject(err);
                                            dbo.collection("Reference").updateMany({_id : obj._id},referenceSet,function(err,db){
                                                if(err)
                                                    reject(err);
                                                resolve("Successfully Updated");
                                    })
                                })
                            })
                        })
                    })    
    })
})
})}

module.exports = updateUser;