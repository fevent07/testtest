const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')


// Register new user
// post  /api/users
const registerUser = asyncHandler(async (req, res) =>{
   const { name, email, password, role } =req.body
   if(role && !['user', 'admin'].includes(role)){
    res.status(400);
    throw new Error('Invalid role');
   }
   if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
   }

   // check if user exists
   const userExists = await User.findOne({email})

   if(userExists){
    res.status(400)
    throw new Error('user already exists')
   }

   //hash password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)
// create user
   const user = await User.create({
   name,
   email,
   password: hashedPassword,
   role: role || 'user'
})

if(user){
    res.status(201).json({
        _is:user.is,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    })
} else{
    res.status(400)
    throw new Error('Invalid user name')
}
    // res.json({ message: 'Register USer'})
})

// Authenticate a user
// post  /api/users
const loginUser = asyncHandler(async(req, res) =>{
    const { email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
    
    // res.json({ message: 'Login USer'})
})

// Get user data
// get  /api/users/me
//PRIVATE
const getMe = asyncHandler(async(req, res) =>{
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
        role

    })
    // res.json({ message: 'user data display'})
})


const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}
module.exports ={
    registerUser,
    loginUser,
    getMe
}