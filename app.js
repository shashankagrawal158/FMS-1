const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const app = express();
app.use(express.json());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// connection
const db_link="mongodb+srv://fms:LUrX5kzoMH7J35Ek@cluster0.gltwwb7.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then(function(db){
    console.log('connection successful');
})
.catch(function(err){
    console.log(err);
});

// model

const userSchema=mongoose.Schema({

    
    email:{
       type:String,
       required:true,
       unique:true
    },
    password:{type:String,
   required:true,
   minLength:8 //length minimum kitni honi chahiye for validation
}
,   confirmPassword:{type:String,
   
   minLength:8
},

})
const USERMODEL= new mongoose.model('USERMODEL',userSchema);

//
                        // schema for paersonal 
const personalSchema=mongoose.Schema({

        title: {type:String, required:true},
        firstName:{type:String, required:true} ,
        middleName:{type:String} ,
        lastName: {type:String},
        dateOfBirth:{type:Date, required:true} ,
        gender: {type:String, required:true},
        fatherName:{type:String, required:true} ,
        motherName: {type:String, required:true},
        martialStatus:{type:String, required:true} ,
        spouseName: {type:String},
        houseNo: {type:String, required:true},
        street: {type:String, required:true},
        city: {type:String, required:true},
        state: {type:String, required:true},
        country:{type:String, required:true} ,
        pincode: {type:Number, required:true},
        phouseNo:{type:String, required:true} ,
        pstreet: {type:String, required:true},
        pcity: {type:String, required:true},
        pstate: {type:String, required:true},
        pcountry:{type:String, required:true},
        ppincode:{type:Number, required:true},
        landlineNo: {type:Number},
        mobileNo: {type:Number, required:true},
        alternateMobNo: {type:Number},
        personalEmail: {type:String,required:true},
        officialEmail: {type:String, required:true},
        adhar: {type:Number, required:true},
        pan: {type:Number, required:true},
        dateOfJoin: {type:String, required:true},
        designation: {type:String, required:true},
        department:{type:String ,required:true},
        isLeft: {type:String, required:true},
        dateOfRelieving: {type:String },
        // loginID:{type:Number, required:true}
})

//
                        //model for personal
const UserPersonalModel=new mongoose.model("UserPersonalModel",personalSchema)

                                // login api
app.route("/login")
.get(function(req,res){
    res.render("login");
})
.post(function(req, res){
    const username = req.body.email;
    const password = req.body.password;

    USERMODEL.findOne({email: username}, function(err, foundedUser){

        if(foundedUser){
            if(password === foundedUser.password) {
            console.log("Matched")

            // yaha successful login ke baad ka page aega
            
            // res.redirect("/personal");
            }
            else{
                console.log("Incorrect");
            }

        }
        else{
            console.log("User Not Found");
        }
    });
});
                                                // personal page api
app.route("/personal")
.get(function(req, res){
    res.render("personal.ejs");
})
.post(function(req, res){

    const personal=new UserPersonalModel({

     title: req.body.title,
 firstName: req.body.firstName,
 middleName: req.body.middleName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
 gender: req.body.gender,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
     martialStatus:req.body.martialStatus,
    spouseName:req.body.spouseName,
    //present 
 houseNo:req.body.houseNo,
 street:req.body.street,
    city:req.body.city,
 state:req.body.state,
    country:req.body.country,
    pincode: req.body.pincode,
    //permanent
    phouseNo: req.body.phouseNo,
    pstreet: req.body.pstreet,
    pcity: req.body.pcity,
    pstate: req.body.pstate,
    pcountry:req.body.pcountry,
    ppincode:req.body.ppincode,
    landlineNo:req.body.landlineNo,
    mobileNo:req.body.mobileNo,
    alternateMobNo: req.body.alternateMobNo,
    personalEmail: req.body.personalEmail,
    officialEmail: req.body.officialEmail,
    adhar: req.body.adhar,
    pan: req.body.pan,
    dateOfJoin: req.body.dateOfJoin,
 designation: req.body.designation,
 department:req.body.department,
    isLeft: req.body.isLeft,
    dateOfRelieving: req.body.dateOfRelieving,
    // loginID:req.body.loginID,

    })
    
console.log("hello");
 personal.save(function(err){
     if(!err){
         console.log("Added successfully");
         console.log(req.body);
         res.redirect("/experience");
     }
     else{
         console.log(err);
     }
 });
});


app.route("/")
.get(function(req, res){
    res.render("signUp");
})
.post(function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    // console.log(email, password, confirmPassword);
    if(email === "" || password === "" || confirmPassword === ""){
        alert("Fields are empty!!");
    }
    else{
        const user = new USERMODEL({
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        });
        user.save();
        console.log("Hello");
    }
    res.render("personal");
});



                                             //experience master api 

app.route("/experience")              //GET-POST API FOR facultyExperienceMaster

.get(function(req, res){



    res.render("facultyExperienceMaster");

})

.post(function(req, res){



    const personExp = new Model({

        faculty_ID: req.body.faculty_ID,

        organizName: req.body.organizName,

        designation: req.body.designation,

        dateOfJoin: req.body.dateOfJoin,

        dateOfRelieving: req.body.dateOfRelieving,

        payScale: req.body.payScale,

        lastSalaryDrawn: req.body.lastSalaryDrawn,

        jobProfile: req.body.jobProfile,

        reasonForLeaving: req.body.reasonForLeaving,

    });



    personExp.save(function(err){

        if(!err){

            console.log("Added successfully");

            res.redirect("/experience");

        }

        else{

            console.log(err);

        }

    });

});
//                                        
                                           //GET-POST API FOR facultyPHDQualification

app.route("/PHD")              

.get(function(req, res){

    res.render("PHDQualification");

})

.post(function(req, res){



    const personPHDQual = new Model({

        faculty_ID: req.body.faculty_ID,

        collegeDepartment: req.body.collegeDepartment,

        university: req.body.university,

        status: req.body.status,

        dateOfAward: req.body.dateOfAward,

        thesisTitle: req.body.thesisTitle,

        registrationDate: req.body.registrationDate,

        thesisSubmissionDate: req.body.thesisSubmissionDate,

        detailOfSupervisor: req.body.detailOfSupervisor,

    });



    personPHDQual.save(function(err){

        if(!err){

            console.log("Added successfully");

            res.redirect("/facultyPHDQualification");

        }

        else{

            console.log(err);

        }

    });

});



// app.route("/facultyQualification")              //GET-POST API FOR facultyQualification
// .get(function(req, res){

//     res.render("EJS-file");
// })
// .post(function(req, res){

//     const personQual = new Model({
//         level: req.body.level,
//         examDegree: req.body.examDegree,
//         school: req.body.school,
//         board: req.body.board,
//         yearOfPassing: req.body.yearOfPassing,
//         maxMarksGrade: req.body.maxMarksGrade,
//         marksObtained: req.body.marksObtained,
//         percMarksObtained: req.body.percMarksObtained,
//         division: req.body.division,
//         achievement: req.body.achievement,
//     });

//     personQual.save(function(err){
//         if(!err){
//             console.log("Added successfully");
//             res.redirect("/facultyQualification");
//         }
//         else{
//             console.log(err);
//         }
//     });
// });











app.listen(3000, function(){
    console.log("Sucessfully started on 3000...")
});