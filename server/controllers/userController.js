import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'
import transactionModel from "../models/transactionData.js"

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = { name, email, password: hashedPassword }
    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token, user: { name: user.name, _id: user._id } })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User does not exist' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token, user: { name: user.name, _id: user._id } })
    } else {
      return res.json({ success: false, message: 'Invalid Credentials' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Get user credits
const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id)
    res.json({ success: true, credits: user.creditBalance, user: { name: user.name } })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Purchase credits via Razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { planId, amount, credits } = req.body
    const userId = req.user._id

    if (!planId || !amount || !credits) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // Create transaction
    const transactionData = {
      userId,
      plan: planId,
      amount,
      credits,
      payment: false,
      date: Date.now()
    }
    const newTransaction = await transactionModel.create(transactionData)

    // Create Razorpay order
    const options = {
      amount: amount * 100, // in paise
      currency: process.env.CURRENCY || 'INR',
      receipt: newTransaction._id.toString(),
    }

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error })
      }
      res.json({ success: true, order })
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body

    // Fetch order info from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if (orderInfo.status === 'paid') {
      const transactionData = await transactionModel.findById(orderInfo.receipt)

      if (!transactionData) {
        return res.json({ success: false, message: 'Transaction not found' })
      }

      if (transactionData.payment === true) {
        return res.json({ success: false, message: 'Payment already processed' })
      }

      // Fetch user
      const userData = await userModel.findById(transactionData.userId)
      if (!userData) {
        return res.json({ success: false, message: 'User not found' })
      }

      // Update user credits
      const creditBalance = (userData.creditBalance || 0) + transactionData.credits
      await userModel.findByIdAndUpdate(userData._id, { creditBalance })

      // Mark transaction as paid
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

      return res.json({ success: true, message: 'Credits Added' })
    } else {
      return res.json({ success: false, message: 'Payment Failed' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { registerUser, loginUser, userCredits, paymentRazorpay , verifyRazorpay}
