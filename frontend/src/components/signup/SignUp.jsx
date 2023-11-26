import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const navigate =  useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handlerInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handlerSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = user;
    if (name && email && password) {
      fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Convert data to JSON string
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "This email is already exists") {
          alert(" This email is already exists");
        }
       else{
       alert(data.massege)
       //console.log(data)
        navigate('/')
       }
        // Handle the response data here
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
        <div className="col-md-4 offset-md-4 form-section">
          <div className="login-form bg-white mt-1 pt-5 pb-5 ps-4 pe-4 rounded ">
            <form
              action=""
              method=""
              className="row g-3"
              onSubmit={handlerSubmit}
            >
              <h4 className="text-center">
                Sign Up <FaUserGraduate />
              </h4>
              <div className="col-12">
                <label>UserName</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  className="form-control"
                  placeholder="Enter UserName"
                  onChange={handlerInput}
                  required
                />
              </div>
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
                  Sign Up
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <div className="col-12">
              <p className="text-center mb-0">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
