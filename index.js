const express = require("express");
const app = express();

// this is to fill process object with env data
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// import routes for todoApi
const todoRoutes = require("./routes/todos")

// mount the todo api routes
app.use("/api/v1",todoRoutes)

app.listen(PORT ,()=>{
    console.log(`server started at ${PORT}`)
})

// connect to the data base

const dbConnect = require('./config/database')
dbConnect()

// default Route

app.get("/" , (req ,res) => {
    res.send(`<h1> this is home page beby <h1>`)
})