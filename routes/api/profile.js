const express = require('express')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator/check')
const router = express.Router()

//@route  GET api/profile/me
//@desc   Get current users profile
//access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is not profile for this user' })
    }

    res.json(profile)

  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

//@route  POST api/profile
//@desc   Create or Update user profile
//access  Private

router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty()
]], (req, res) => {
  
})

module.exports = router