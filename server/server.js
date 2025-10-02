import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json()); 


const frontendUrl = 'https://picify-frontend-pqju.onrender.com'; 

app.use(cors({
    origin: frontendUrl,        // Allows requests ONLY from your deployed frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow necessary methods
    credentials: true,          // CRITICAL for allowing cookies/tokens in authentication
}));
// ------------------------------------------------------------------

await connectDB()

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/', (req, res) => res.send("API Working"))

app.listen(PORT, ()=> console.log("Server running on port "+ PORT))
