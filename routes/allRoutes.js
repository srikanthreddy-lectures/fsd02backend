const express=require('express')
const allRouter=express.Router()
const multer=require('multer')
let getFields=multer()


const {Houses, Users, Enquiries}=require('../models/allSchemas')

//To get all the houses information
allRouter.get("/", async (request, response) => {
    const housesData = await Houses.find({});
    try {
      response.send(housesData);
    } catch (error) {
      response.status(500).send(error);
    }
});

//To store the user data.
allRouter.post("/signup", getFields.none(), async (request, response) => {
  try {
    const newuser=new Users(request.body)
    let user=await newuser.save();
    user = user.toObject();
    // console.log(request); 
      if(user)
      response.send(user);
    else 
      response.send("User already exists");
    } catch (error) {
      response.status(500).send(error);
      console.log(" in catch");
    }



 
});

//To authenticate the user
allRouter.post("/login", getFields.none(), async (request, response) => {
    console.log(request.body);
    let user=await Users.findOne({email:request.body.email,password:request.body.password})
   
    try {
        if(user)
            response.send(user);
        else
            response.send('Authentication Failed')
    } catch (error) {
        response.status(500).send(error);
    }
});

//To store the enquiry data.
allRouter.post("/register", getFields.none(), async (request, response) => {
    const newEnquiry=new Enquiries(request.body)
    try {
    let enquiry=await newEnquiry.save()
    enquiry = enquiry.toObject();
    
      response.send(enquiry);
    } catch (error) {
      response.status(500).send(error);
    }
});

//To get all the enquiry information
allRouter.get("/allenquiries", async (request, response) => {
    const enquiryData = await Enquiries.find({});
    try {
      response.send(enquiryData);
    } catch (error) {
      response.status(500).send(error);
    }
});

module.exports = allRouter