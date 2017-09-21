import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInput extends Component {
	constructor(props){
		super(props);
		this.state = {inputValue = ""}
		this.handleSubmit.bind(this);
		this.onHandleChange
	}

	handleSubmit(event){
		props.handleSubmit(this.state.inputValue);
		event.preventDefault();
	}

	handleChange(event){
		this.setState({inputValue:event.target.value});
	}

	render(){
		return (
			<form className="form-inline" onSubmit={this.handleSubmit}>
				<input type="text" className="form-control-plaintext" placeholder="User" value={this.state.inputValue} onChange={this.handleChange}></input>
				<button type="submit" class="btn btn-primary">Find Followers</button> 
			</form>
		);
	}
}

UserInput.propTypes {
	handleSubmit: PropTypes.func.isRequired
}

export default UserInput;