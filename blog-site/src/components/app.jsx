import React, {useState} from 'react';
// import Footer from "./footer.jsx";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Compose from "./compose";
import Users from "./users";
import Navbar from "./navbar"
import axios from "axios";

function App(){

const[userIsLoggedIn, setUserIsLoggedIn]=useState(true);
const[userData, setUserData]=useState(null);

function getUser(event){
  axios({
    method:"get",
    withCredentials:true,
    url:"http://localhost:4000/user",
  })
  .then(res => (setUserData(res.data), setUserIsLoggedIn(true)));
};

  return (
      <Router>
        <Navbar isLoggedIn={userIsLoggedIn}/>
        <div>
          <Switch>
          <Route path="/users" >
            <Users />
          </Route>
            <Route path="/compose">
              <Compose />
            </Route>
            <Route path="/login">
              <Login  />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

export default App;
