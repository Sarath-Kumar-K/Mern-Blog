import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'

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

app.use('/api/user',userRoute);