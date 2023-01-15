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
}
})
const USERMODEL= new mongoose.model('USERMODEL',userSchema);

//


//
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
            
            res.redirect("/personal");
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

app.route("/personal")
.get(function(req, res){
    res.render("personal.ejs");
})
.post(function(req, res){
    console.log(req.body.you);
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


app.route("/facultyPersonal")              //GET-POST API FOR facultyPersonal
.get(function(req, res){

    res.render("EJS-file");
})
.post(function(req, res){

    const person = new Model({
        title: req.body.title,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        martialStatus: req.body.martialStatus,
        spouseName: req.body.spouseName,
        houseNo: req.body.houseNo,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode,
        landlineNo: req.body.landlineNo,
        mobileNo: req.body.mobileNo,
        alternateMobNo: req.body.alternateMobNo,
        personalEmai: req.body.personalEmai,
        personalEmaiAl: req.body.personalEmaiAl,
        officialEmail: req.body.officialEmail,
        adhar: req.body.adhar,
        pan: req.body.pan,
        dateOfJoin: req.body.dateOfJoin,
        designation: req.body.designation,
        isLeft: req.body.isLeft,
        dateOfRelieving: req.body.dateOfRelieving,
        loginID: req.body.loginID
    });

    person.save(function(err){
        if(!err){
            console.log("Added successfully");
            res.redirect("/facultyPersonal");
        }
        else{
            console.log(err);
        }
    });
});


app.route("/facultyQualification")              //GET-POST API FOR facultyQualification
.get(function(req, res){

    res.render("EJS-file");
})
.post(function(req, res){

    const personQual = new Model({
        level: req.body.level,
        examDegree: req.body.examDegree,
        school: req.body.school,
        board: req.body.board,
        yearOfPassing: req.body.yearOfPassing,
        maxMarksGrade: req.body.maxMarksGrade,
        marksObtained: req.body.marksObtained,
        percMarksObtained: req.body.percMarksObtained,
        division: req.body.division,
        achievement: req.body.achievement,
    });

    personQual.save(function(err){
        if(!err){
            console.log("Added successfully");
            res.redirect("/facultyQualification");
        }
        else{
            console.log(err);
        }
    });
});



app.route("/facultyPHDQualification")              //GET-POST API FOR facultyPHDQualification
.get(function(req, res){

    res.render("EJS-file");
})
.post(function(req, res){

    const personPHDQual = new Model({
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



app.route("/facultyExperienceMaster")              //GET-POST API FOR facultyExperienceMaster
.get(function(req, res){

    res.render("EJS-file");
})
.post(function(req, res){

    const personExp = new Model({
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
            res.redirect("/facultyExperienceMaster");
        }
        else{
            console.log(err);
        }
    });
});




app.listen(3000, function(){
    console.log("Sucessfully started on 3000...")
});