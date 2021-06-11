const dotenv = require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 9000
const path = require("path")

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,"cient/build")))

app.use("/api/*",(_,res) =>{
    res.json({data: "The api lives, it lives I tell you!!!"})
})

app.use('*', (_,res) =>{
    res.sendFile(path.join(__dirname, 'cient/build','index.html'))
})

app.listen(port, () =>{
    console.log(`server is alive on port ${port}`)
})



console.log("It's alive")
console.log(__dirname)
console.log(__filename)
console.log(process.env.USER)
console.log(process.env.PORT)
console.log(dotenv)//