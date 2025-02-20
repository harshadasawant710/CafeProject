import React, { useState } from 'react';
import {toast} from "react-hot-toast";
import { Link } from 'react-router-dom';


const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle registration
  function handelReg(e) {
    e.preventDefault();
    const formdata = { username, password, email };

    fetch("/api/Register", {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
    .then((res)=>{ return res.json()}).then((data)=>{
      if(data.status === 201){
        toast.success(data.successMessage)
        setSuccessMessage(data.toast,"sucessfully Submitted")
      }
      else{
        setSuccessMessage(data.successMessage)
        toast.error(data.successMessage)
        setErrorMessage(data.toast)
      }
    })
    
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-7'></div>
        <div className='col-md-5'>
          <form className='mt-5' onSubmit={handelReg}>
            <h3>Registration Form</h3>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control mt-3"
              placeholder="Username"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control mt-3"
              placeholder="Password"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control mt-3"
              placeholder="Email"
              required
            />
            <button className='btn btn-primary mt-3 form-control'>Register</button>
            <Link to="/LogIn"><button className='form-control mt-2 btn btn-dark'>LogIn</button></Link>
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
