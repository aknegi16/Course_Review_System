const express = require('express');
const router = express.Router();
const logger = require('../logger');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Course=require('../models/Course')
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) =>{
  //update this populate
 // courses=[dm,spe]
   courses=await Course.find().populate({path:"Reviews"})
  // console.log("\n",courses)


  logger.logResponse(req.user, req.user ,"User logged in");
   //course=await Course.find()
    res.render('dashboard', {
      user:req.user,
      courses:courses,
      
    })}
  );
  

module.exports = router;
