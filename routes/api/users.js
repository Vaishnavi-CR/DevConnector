const express = require('express')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const router = express.Router(); //instantiating only the router library of the express
//@route POST api/users/register
//@desc Register the User
//@access public

router.post('/register', (req,res) => {
  const {errors, isValid} = validateRegisterInput(req.body) //deconstruction of an object
  if(!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({email: req.body.email}) //email is schema email and req.body.email is the user typed email on the UI
    .then(userInfo => {
      if (userInfo) {
        return res.status(400).json({email: "Email already exists!"})
      } 
      else {
        const avatar = gravatar.url(req.body.email, {s: '200', rating: 'pg', d: 'mm'})
        const newUser = User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar //can just write only avatar - deconstruction as LHS = RHS
        })
        bcrypt.genSalt(10, (err,salt) => {
          if(err) throw err
          bcrypt.hash(newUser.password, salt, (err,hash) => {
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })  
      }    
    })
  .catch(err => console.log(err))
})

//@route POST api/users/login
//@desc Login the user
//@access public

router.post('/login',(req,res)=>{
  const {errors, isValid} = validateLoginInput(req.body) //deconstruction of an object
  if(!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({email: req.body.email})
  .then(userInfo => {
    if(!userInfo) {
      return res.status(400).json({email: "User not found!"})
    }
    else {
      bcrypt.compare(req.body.password, userInfo.password)
      .then(isPwdMatch => {
        if(isPwdMatch){
          //User matched
          //create payload
          const payload = {
            id: userInfo.id,
            name: userInfo.name,
            avatar: userInfo.avatar
          }
          //create token or sign token
          jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err,token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            })
          })
          
        } else {
          return res.status(400).json({password: 'Password incorrect!'})
        }
      })
      .catch()
    }
  })
  .catch()
})

//@route GET api/users/current
//@desc Return current user information
//@access private

router.get(
  '/current',
  passport.authenticate('jwt',{session: false}),
  (req,res) => {

    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email

    })
  }
)

module.exports = router
