const express = require('express');
const {signup,login,}=require("../controllers/authControllers")
const {protect}=require("../middleware/authMiddleware")
const router = express.Router();
router.post("/signup",signup)
router.post("/login",login)
module.exports=router;