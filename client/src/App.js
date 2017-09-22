import React, { Component } from "react";
import "./App.css";
import UserInput from "./UserInput.jsx";
import ListFollowers from "./ListFollowers.jsx";
import SearcHistory from "./SearchHistory";

class App extends Component {
  constructor(props){
    super(props);
    this.onNewUser = this.onNewUser.bind(this);
    this.state = {
      followers:[],
      history: []
    };
  }

  onNewUser(user, newSearch, userToGoBack){
    fetch("/followers/" + user).then((response) => {
      var responseData = response.json();
      responseData.then((data)=>{
        let followers = data.data;
        let history   = this.state.history.splice(0);
        if(newSearch){
          history = [];
          history.push(user);
        } else {
          if(!userToGoBack){
            history.push(user);
          } else {
            history.splice(history.lastIndexOf(userToGoBack) + 1);
          }
        }
        this.setState({followers:followers,
          history:history});
      });
    });
  }

  render() {
    return (
      <div className="container main">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">GitFollow</a>
          <UserInput className="my-2 my-lg-0" handleSubmit={this.onNewUser} />
        </nav>
        <SearcHistory handleClick={this.onNewUser} history={this.state.history} />
        <ListFollowers handleNewUser={this.onNewUser} followers={this.state.followers}/>
      </div>
    );
  }
}

export default App;
