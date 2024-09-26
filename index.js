const express = require("express");
const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware to parse json request body
app.use(express.json());

//import routes for TODO API
const blog = require("./routes/blog");

//mount the todo API routes
app.use("/api/v1", blog);

//start server
app.listen(PORT, () => {
    console.log(`Server started successfully at PORT no. ${PORT}`);
})

//connect to the database
const dbConnect = require("./config/database");
dbConnect();

//default Route
app.get("/", (req,res) => {
    res.send(`<h1> This is HOMEPAGE</h1>`);
})