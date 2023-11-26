import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";

const Login = ({setUserLogin}) => {
const [propdata,setProdata] = useState(false)
const navigate = useNavigate()
  const [user,setUser] = useState({
    email:'',
    password:''

  })

 
  const handlerInput = (e)=>{
    const {name,value} = e.target
    setUser({
      ...user,
      [name]:value
    })
  }
  const handlerSubmit = (e)=>{
    e.preventDefault();
    const {email, password } = user;
    if (email && password) {
      fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), 
    })
      .then((response) => response.json())
      .then((data) => {
      // console.log(data)
      if(data.success==false){
        alert(data.msg)
      }
       else if(data.success==true){

       localStorage.setItem('userData',JSON.stringify(data.data))
       navigate('/')
       setUserLogin(data.data);
      
       alert(data.msg)
       setUserLogin(data.data)
        //setTimeout(()=>  setUserLogin(data.data),0)
       
       }
      
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
    } else {
      alert("All Fields is required");
    }
  
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-3  w-50">
          <div className="login-form bg-white mt-1 pt-5 pb-5 ps-4 pe-4 rounded ">
            <form action="" method="" className="row g-3" onSubmit={handlerSubmit}>
              <h4 className="text-center" >Login <FaUserCircle/></h4>
              <div className="col-12">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  className="form-control"
                  placeholder="Enter Your Email"
                  onChange={handlerInput}
                  required
                  
                />
              </div>
              <div className="col-12">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  className="form-control"
                  placeholder="Enter Your Password"
                  onChange={handlerInput}
                  required
                />
              </div>
              <div className="col-12 d-grid mt-4 ">
                <button type="submit" className="btn btn-primary d-block ">
                  Login
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <div className="col-12">
              <p className="text-center mb-0">
                Have not account yet? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
