import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Database connected successfully!");
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log("Server is listening to the port 3000");
})

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);