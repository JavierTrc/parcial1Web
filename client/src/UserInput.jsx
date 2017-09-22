import React, { Component } from "react";
import PropTypes from "prop-types";

class UserInput extends Component {
	constructor(props){
		super(props);
		this.state = {inputValue:""};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){
		this.props.handleSubmit(this.state.inputValue, true, undefined);
		event.preventDefault();
	}

	handleChange(event){
		this.setState({inputValue:event.target.value});
	}

	render(){
		return (
			<form className="form-inline" onSubmit={this.handleSubmit}>
				<input type="text" className="form-control mr-sm-2" placeholder="User" value={this.state.inputValue} onChange={this.handleChange}></input>
				<button type="submit" className="btn btn-outline-primary my-2 my-sm-0">Find Followers</button> 
			</form>
		);
	}
}

UserInput.propTypes = {
	handleSubmit: PropTypes.func.isRequired
};

export default UserInput;
