const dotenv = require("dotenv").config()

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000
const path= require("path");

app.use(cors());
app.use(express.json());
// go find static assets and run them on the server
app.use(express.static(path.join(__dirname,"client/build")));

app.use("/api/",(_,res)=>{
    res.json({data: "The API is serving data! Can put anything here!"})
})

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})




console.log("hi");
console.log(__dirname);
console.log(__filename);
console.log(process.env.USER); /* .USERNAME for windows */
console.log(process.env.PORT);

console.log(process.env.GREET);
console.log(process.env.FOOD);
console.log(process.env.REALLY);