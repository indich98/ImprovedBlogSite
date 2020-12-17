import React, {useState} from "react";
import axios from "axios";

function Login() {

  const[registerUsername, setRegisterUsername]=useState("");
  const[registerPassword, setRegisterPassword]=useState("");
  const[registerConfirmPassword, setRegisterConfirmPassword]=useState("");
  const[loginUsername, setLoginUsername]=useState("");
  const[loginPassword, setLoginPassword]=useState("");


  const[userData, setUserData]=useState(null);

  function getUser(event){
    axios({
      method:"get",
      withCredentials:true,
      url:"http://localhost:4000/user",
    })
    .then(res => setUserData(res.data))
    ;
  };


  function login(event){
    axios({
      method:"post",
      data:{
        username: loginUsername,
        password:loginPassword,
      },
      withCredentials:true,
      url:"http://localhost:4000/log-in",
    })
    .then(res => getUser(res));
  };

  function register(event){
    axios({
      method:"post",
      data:{
        username: registerUsername,
        password:registerPassword,
        confirmPassword:registerConfirmPassword,
      },
      withCredentials:true,
      url:"http://localhost:4000/register",
    })
    .then(res => console.log(res));
  };


  return (
    <div className="container login-container">
    <div className="row">


    <div className="col-lg-6">
    <h1>Log In</h1>
    <form className="form">
    <div className="form-group">
    <input type="text" placeholder="Username" onChange={event => setLoginUsername(event.target.value)} className="login-input"/>
    </div>
    <div className="form-group">
    <input type="password" className="login-input" placeholder="Password" onChange={event => setLoginPassword(event.target.value)}/>
    </div>
    <div className="form-group">
    <button className="btn login-btn" type="submit" onClick={login}>Log In</button>
    </div>
    </form>
    </div>


    <div className="col-lg-6">
    <h1>Register</h1>
    <form className="form">
    <div className="form-group">
    <input type="text" placeholder="Username" onChange={event => setRegisterUsername(event.target.value)} className="login-input" />
    </div>
    <div className="form-group">
    <input type="password" className="login-input" onChange={event => setRegisterPassword(event.target.value)} placeholder="Password" />
    </div>
    <div className="form-group">
    <input type="password" className="login-input" onChange={event => setRegisterConfirmPassword(event.target.value)} placeholder="Confirm Password" />
    </div>
    <div className="form-group">
    <button className="btn login-btn" type="submit" onClick={register} >Register</button>
    </div>
    </form>
    </div>


    </div>
    </div>

  );
}

export default Login;
