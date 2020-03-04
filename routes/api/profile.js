const express = require('express')
const router = express.Router(); //instantiating only the router library of the express

//@route GET api/profiles/test
//@desc Tests profiles route
//@access Public

router.get('/test',(req,res) => res.json({ msg: "Profile works!"}))

module.exports = router