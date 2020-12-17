import React from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


function Compose() {
  return (
    <div className="compose-div container-fluid">
    <form>
      <h1>Compose blog Post</h1>
      <div className="form-group">
      <input type="text" class="form-control" placeholder="Title" />
      </div>
      <div className="form-group">
      <textarea class="form-control" placeholder="Content"/>
      </div>
      <div>
      <button className="btn post-btn">Submit</button>
      </div>
      </form>
    </div>
  );
}

export default Compose;
