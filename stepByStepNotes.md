https://github.com/qirhi/herokuapp.git

## get a git ignore file - node type
npx gitignore node

## get a package.json
npm init -y

## get your .git folder
git init

NOTES:
git remote -v
- Tells you where you are pushing and fetching

## install express
[] npm i express

## install nodemon
[] npm i -D nodemon

## set up scripts - package.json

"start":"node index.js"
    - Heroku REQUIRES a start script

"server":"nodemon index.js"

## create index.js

##  write these logs in the index.js

console.log("hi")
console.log(__dirname)
console.log(__filename)
console.log(process.env.USER) /* .USERNAME for windows */
console.log(process.env.PORT) 

##  npm run server

npm run server

## create .env file in root

- it is greyed out, so it gets ignored
- sensitive info: keys, tokens goes in this file

## install .env
[] npm i dotenv

## Add to .env file

PORT=1234

## bring into the index.js

const dotenv = require("dotenv").config()

## add console.log to index.js

console.log(process.env.PORT);

## make the server - in index.js

const express = require("express");
const app = express();

## define the port - in index.js
const port = process.env.PORT || 5000

## set the server to listen on port

app.listen(port, () => {
    console.log(`Server runnin gon port ${port}`)
})

## set up the end point - in index.js
- use underscore as a placeholder

app.use("/api/", (_,res)=> {
    res.json({data: "The API is serving data! Can put anything here!"})
})

## get cors
[] npm i cors

    - import it into index.js

const cors = require("cors");

    - tell app to use it

    app.use(cors());

- tell app to use express
app.use(express.json());

## HEROKU

NOTE:  postgress happens in RESOURCES

- new app, give it a name
- Deploy:
    - deploy method, github


## MONOLITH

- data that is made that only your website uses
- a front end and a back end

1) create react app

[] npx create-react-app client --use-npm

2) make a build folder
[] npm run build
- makes a build folder
- have all the assets needed to run it
- the build minifies everything in the app
- later we will tell the server to run the build app

3) add this heroku script to the package.json file

    "heroku-postbuild":"cd client && npm i && npm run build"

    - when it looks at package.json, it will install all the dependences
    - it will run this command after you have built the app
    - this happens on the heroku side, after we buid the app
    - cd into client, install dependences, run the buoild folder, serve stuff in the biuld folder

4) Tell the server to use this ... serve the files in the build folder.  Add this to index.js 

    const path= require("path");

5) Tell the app to find statis assets and run them on the server. Add this to index.js

    app.use(express.static(path.join(__dirname,"client/build")));

6) Create a catch all end point in index.js

    app.use("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"client/build","index.html"))
    });

    WHAT:  This code makes it so it covers any endpoint after the first slash. It will take them to the homepage.

7) Tell the react app where the api data lives

- tell the react apt where the api data lives

- import in the app.js file of the react app

    import { useState, useEffect } from 'react';

8)  In the react app.js file, tell it which path to go to dependent on the environment it is in:

    function url(path){
    // this is a build in env var that tells  you where it is NODE_ENV
    return process.env.NODE_ENV = "development" ? `http://localhost:1234${path}` : path
    }

9) add to App.js

  const [data, setData] = useState("Hi");

10) add useEffect to App.js --> make the data fetch happen here

  useEffect(()=>{
    fetch(url("/api/"))
      .then(res=>res.json()) // this line converts it to json
      .then(apiData=> setData(apiData.data))
  },[]);

11) Add the variable data in the App in App.js

  return (
    <div className="App">
      <header className="App-header">
        Api data returned: {data}
      </header>
    </div>
  );

  12)  PUSH to github and manual DEPLOY in Heroku. Done.

  - Test:  https://node-api4-project-heroku.herokuapp.com/

  - Test:  https://node-api4-project-heroku.herokuapp.com/api
