import React from 'react';
import {Link} from "react-router-dom";

function Navbar(props){
  return(
    <div>
    <nav className="NavbarItems">
    {props.isLoggedIn ?  (<Link  to="/">Home</Link>) : null }
    {props.isLoggedIn ?  (<Link to="/compose">Compose</Link>) : null }

        <Link to="/users">Users</Link>
    {props.isLoggedIn ?  null : (<Link to="login">Log In</Link>) }
    {props.isLoggedIn ?  (<button className="btn logout-btn">Log Out</button>) : null }
    </nav>
    </div>






);
}

export default Navbar;
