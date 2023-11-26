import React, { useState,useEffect } from "react";
import "./App.css";
import HomePage from "./components/homepage/HomePage";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import { Routes, Route} from 'react-router-dom';
import Portfolio from "./components/portfolio/Portfolio";
import NotFoundPage from "./components/notfoundpage/NotFoundPage";

function App() {
 const [userLogin,setUserLogin] =  useState({})
const [singlUserDetail,setsinglUserDetail] = useState({})
 useEffect(()=>{
  
  const storedData = localStorage.getItem('userData');
  //console.log(storedData)
 if (storedData) {
  setsinglUserDetail(JSON.parse(storedData))
 }
},[])
  return (
    <div className="main-section">
      <div className="App">
      
      <Routes>
      {/* <Route path="/" exact element={singlUserDetail && singlUserDetail._id  ? <HomePage />:<Login setUserLogin={setUserLogin} />} /> */}
      <Route path="/" exact element={userLogin && userLogin._id  ? <HomePage />:<Login setUserLogin={setUserLogin} />} />
      <Route path="/login"  element={<Login/>} />
      <Route path="/signup"  element={<SignUp/>} />
      <Route path="/portfolio"  element={singlUserDetail && singlUserDetail._id  ? <Portfolio />:<Login  />} />
      <Route path="*" element={<NotFoundPage/>}/>
        
      </Routes>
      

      </div>
    </div>
  );
}

export default App;
