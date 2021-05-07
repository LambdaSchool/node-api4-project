const express = require('express')
const path = require('path')
const server = express()
const cors = require('cors')

const port = process.env.PORT || 9000

server.use(express.static(path.join(__dirname, 'client/build')))
server.use(cors())
server.use(express.json())

server.get('/api/*', (req,res)=>{
    res.json({message: 'api is working'})
})

server.use('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

server.use((err, req, res, next) =>{
    res.status(500).json({
        message:err.message,
        stack: err.stack
    })
})

server.listen(port, ()=>{
    console.log(`listening on ${port}`)
})