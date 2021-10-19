const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('../models/user');
const auth = require('../middleware/auth');


router.get('/', (req,res) => {
    res.send("Hello from the server side!")
})

router.post('/register', async (req,res) => {
    const {firstname, lastname, email, password, cpassword} = req.body;
    

    if(!firstname || !lastname || !email || !password || !cpassword){
        return res.status(422).json({error : "Please fill all the fields."});
    }

    try{
    
        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(422).json({error : "user already exists."});
        }

        if(password !== cpassword){
            return res.status(422).json({error : "passwords dont match."});
        }else{
            const user = new User({firstname, lastname, email, password, cpassword});

             const registered = await user.save();
  
              res.status(201).json({message : "Registered Successfully!"});
        }

        

        
    }catch(e){
        res.status(500).json({message :`Could not create account! --> ${e}`});
    }
})

router.post('/login', async (req,res) => {
    try{
    const logEmail = req.body.email;
    const logPass = req.body.password;

    if(!logEmail || !logPass){
        return res.status(422).json({error : "Please fill all the fields."});
    }

    const userEmail = await User.findOne({email:logEmail});
    const passCheck = await bcrypt.compare(logPass,userEmail.password);

    const token = await userEmail.generateAuthToken();

    res.cookie("jwt",token,{
        expires: new Date(Date.now() + 60000000),
        httpOnly : true
    });

   res.send(token);


    if(passCheck){
        res.json({message :"Logged In Successfully!"});
    }else{
        res.status(400).json({message :"Invalid login credentials"});
    }

} catch (error) {
    res.status(500).json({message :"Invalid login credentials"});
}
})

router.get('/logout', auth, async (req,res) => {
    try{
        console.log(req.rootUser.tokens);
        req.rootUser.tokens = req.rootUser.tokens.filter((currElem) => {
            return currElem.token != req.token;
        })
        res.clearCookie("jwt",{path:"/"});
        res.status(200).send({"message":"logged out successfully!"})
        await req.rootUser.save();

    }catch(e){
        res.status(500).send(e);
    }
})

router.get('/getData', auth, (req,res) => {
    res.send(req.rootUser);
})

router.post('/flighthistory',auth, async(req,res) => {
    const { carrier, from, to, fromairport, toairport, dept, arrival, email } = req.body;
    try{
    if(!carrier || !from || !to || !fromairport || !toairport || !dept || !arrival || !email){
        return res.status(422).json({error : "Please fill all the fields."});
    }

    const user = await User.findOne({email:email});

    if(user){
        const prevFlights =  await user.flightHistory(carrier, from, to, fromairport, toairport, dept, arrival);
        console.log(prevFlights);
        await user.save();
        res.status(201).json({message : "Data sent successfully"});
    }else{
        return res.status(422).json({error : "User doesn't exist."});
    }
    }catch(e){
        return res.status(422).json(e);
    }
    


})



module.exports = router;