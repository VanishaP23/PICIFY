import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const userAuth = async (req, res, next) => {
  const token = req.headers['token']

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid token' })
    }

    // Attach the full user object to req.user
    const user = await userModel.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    req.user = user // ✅ now you can use req.user._id anywhere
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: error.message })
  }
}

export default userAuth
