import './App.css';
import { useState, useEffect } from 'react';

function url(path){
  // this is a build in env var that tells  you where it is NODE_ENV
  return process.env.NODE_ENV === "development" ? `http://localhost:1234${path}` : path
}

function App() {
  const [data, setData] = useState("Hi");

  useEffect(()=>{
    fetch(url("/api/"))
      .then(res=>res.json()) // this line converts it to json
      .then(apiData=> setData(apiData.data))
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        Api data returned: {data}
      </header>
    </div>
  );
}

export default App;
