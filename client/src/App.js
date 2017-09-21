import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./UserInput.jsx";
import "./ListFollowers.jsx";

class App extends Component {
  constructor(props){
    super(props);
    this.onNewUser.bind(this);
  }

  onNewUser(user){
    fetch("/followers/" + user, function(response){
      
    })
  }

  render() {
    return (
      <div>
        <UserInput handleSubmit={this.onNewUser} />
        <ListFollowers handleSubmit={this.onNewUser} />
      </div>
    );
  }
}

export default App;
