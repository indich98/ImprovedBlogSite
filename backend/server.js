const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

// **************************** middleware *********************************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(session({
  secret: "SecretCode",
  resave: false,
  saveUninitialized: false
}));

app.use(cookieParser("secretCode"));
app.use(passport.initialize());
app.use(passport.session());
//*********************************mongoose setup ********************************************
mongoose.connect("mongodb://localhost:27017/blogsiteDB", {useNewUrlParser: true, useUnifiedTopology:true});
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema ({
  username: String,
  password: String,
});


const User = new mongoose.model("User", userSchema);
// const PostsSchema = new mongoose.Schema ({
//   title: String,
//   content: String,
//   userId: String,
// });


//*********************************passport config ********************************************

passport.use(
  new passportLocal((username,password,done) => {
    User.findOne({username: username},(err,foundUser) =>{
      if(err){
        console.log(err);
      }
      else if (!foundUser){
        return done(null, false);
      }
      else if(foundUser){
        bcrypt.compare(password, foundUser.password, (err,result) => {
          if(err){
            console.log(err);
          }
          else if(result===true){
            return done(null, foundUser);
          }
          else{
            return done(null, false);
          }
        });
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


//***************************** Routes *************************************

app.post("/log-in", function(req, res, next){
  passport.authenticate("local", (err,user,info) => {
    if(err){
      console.log(err);
    }
    if(!user){
      res.send("No User Exists");
    }
    else{
      req.logIn(user, err => {
        if(err){
          console.log(err);
        }
        else{
          res.send("Successfuly Authenticated");
          console.log(req.user);
          // res.redirect("/");
        }
      });
    }
  })(req, res, next);
});

app.post("/register", function(req, res){
  User.findOne({username:req.body.username}, async function(err,foundUser){
    if(err){
      console.log(err);
    }
    else if(foundUser){
      res.send("username unavaliable");
    }
    else if(!foundUser){
      if(req.body.password===req.body.confirmPassword){
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(req.body.username, hashedPassword)
        const newUser = new User({
          username:req.body.username,
          password:hashedPassword,
      })
      newUser.save();
      await res.send("User Created");
      // res.redirect("/");
    };
      if(req.body.password!==req.body.confirmPassword){
        res.send("Passwords don't match");
      }
    }
  })
});

app.get("/user", function(req,res){
  res.send(req.user);
});











// ********************************** listen ********************************
app.listen(4000, function() {
  console.log("Server started on port 4000.");
});
