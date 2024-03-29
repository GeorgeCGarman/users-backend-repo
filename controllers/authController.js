const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const handleLogin = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" })
  const foundUser = await User.findOne({ username }).exec()
  if (!foundUser) return res.sendStatus(401)
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    const role = foundUser.role
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    )
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    )
    await User.updateOne(
      { _id: foundUser.id },
      { refreshToken: refreshToken }
    ).exec()
    // const newFoundUser = await User.find({_id: foundUser.id}).exec()
    // res.json([result, newFoundUser])

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    // res.json({'success': `User ${foundUser.username} is logged in`})
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
