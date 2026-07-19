const express = require('express');

const app = express()
const mongoose= require('mongoose');


require("dotenv").config();
const authRoutes= require("./Routes/authRoute")
const profileRoutes = require("./Routes/profileRoute")

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);


mongoose
.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log("mongo not connected")
    console.log(err)
})

const port=process.env.PORT;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})