import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ChatList from "./components/chat-list.component";
import OpenChat from "./components/open-chat.component";
import CreateChat from "./components/create-chat.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
     <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ChatList} />
      <Route path="/edit/:id" component={OpenChat} />
      <Route path="/create" component={CreateChat} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
