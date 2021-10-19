const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true,
        trim : true,
        minLength : 4 
    },
    lastname : {
        type: String,
        required: true,
        trim : true,
        minLength : 4 
    },
    email : {
        type: String,
        required: true,
        trim : true,
        unique: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid Email.");
          }
        },
    },
    password: {
        type: String,
        required: true,
        trim : true,
        minLength : 8 
      },
    cpassword: {
        type: String,
        required: true,
        trim : true,
        minLength : 8 
      },
    date: {
        type : Date,
        default : Date.now
      },
      tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
      flights: [
        {        
              carrier : {
              type: String,
              required: true,        
              },
              from : {
                type: String,
                required: true,  
              },
              to : {
                type: String,
                required: true,  
              },
              fromairport : {
                type: String,
                required: true,  
              },
              toairport : {
                type: String,
                required: true,  
              },
              dept : {
                type: String,
                required: true,  
              },
              arrival : {
                type: String,
                required: true, 
              }
          }
      ]
    
})

// Hashing Passwords

userSchema.pre("save", async function(next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
        console.log(this.password);
      }
      next();
})

// Generating Auth Token

userSchema.methods.generateAuthToken = async function(){
  try {
    let token =  jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;   
  } catch (error) {
    console.log(`Failed to generate token --> ${error}`);
  }
}

userSchema.methods.flightHistory = async function(carrier, from, to, fromairport, toairport, dept, arrival){
  try{
    this.flights = this.flights.concat({carrier, from, to, fromairport, toairport, dept, arrival});
    await this.save();
    return this.flights;
  }catch(e){
    console.log(`Failed to send flight data --> ${e}`);
  }
}

const User = mongoose.model("USER", userSchema);

module.exports = User;