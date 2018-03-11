var mongoose = require("mongoose");
var user = mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    steps:[],
    data:[]
})


var User = mongoose.model("User", user);
exports.User = User;

exports.createUser = (req)=>{
    
    return new Promise((resolve, reject)=>{
        if (!req.body.username || !req.body.password){
            console.log("A0");
            reject({status:-1, message:"Provide details"});
        }
        
        User.findOne({ username: req.body.username }).exec((error, user)=>{
            if (!error && user){
                console.log("A1");
                reject({status:-1, message:"Username Taken"})
            }
            else if (error){
                console.log("A2");
                reject({status:-1, message:error});
            }
            else{
                console.log("A2");
                var newUser = new User({
                    username: req.body. username,
                    password: req.body.password
                })
                newUser.save((err, u)=>{
                    if (!err && u){
                        resolve({status:2,message:"User Signed Up"});
                    }
                    else{
                        reject({status:-1, message:err});
                    }
                })
            }
        })
        console.log("ends");
    })  
}


exports.addStep = (req)=>{
    return new Promise((resolve, reject)=>{
        if (!req.body.count ){
            reject({ status: -1, message: "Provide details" });
        }
        //TODO// User.findById(req.user._id).exec((err, user )=>{
        User.findById(req.body.id).exec((err, user) => {
            if (!user || err){
                console.log(err);
                reject({status:-1, message:"No such user found"});
            }
            else{
                var item = {count:req.body.count,distance:req.body.distance, date:Date.now()};
                User.findByIdAndUpdate(req.body.id, {$push:{steps:item}}, {new: true}).exec((err, s)=>{
                    if (err|| !s){
                        console.log(err);
                        reject({status:-1, message:err});
                    }
                    else{
                        resolve({status:2,message:"Updated at"+req.body.date});
                    }
                })
            }
        })
    })
}



exports.addData = (req,data) => {
    return new Promise((resolve, reject) => {
        //TODO// User.findById(req.user._id).exec((err, user )=>{
        User.findById(req.body.id).exec((err, user) => {
            if (!user || err) {
                console.log(err);
                reject({ status: -1, message: "No such user found" });
            }
            else {
                var item = { path:data.path, type:req.body.type, date:Date.now(), size:data.size};
                if (req.body.class){
                    item["class"] = req.body.class;
                }
                User.findByIdAndUpdate(req.body.id, { $push: { data: item } }, { new: true }).exec((err, s) => {
                    if (err || !s) {
                        console.log(err);
                        reject({ status: -1, message: err });
                    }
                    else {
                        resolve({ status: 2, message: "Uploaded at" + item.date });
                    }
                })
            }
        })
    })
}