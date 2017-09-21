import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListFollowers extends Component {
	constructor(props){
		super(props);
		this.onClick.bind(this);
	}

	onClick(event){
		this.props.handleNewUser();
	}

	render(){
		return (
			<ul>
				{return this.props.followers.map(follower => {
					<li><button onClick={this.onClick}>{follower.login}</button></li>
				})}
			</ul>
		);
	}
}

ListFollowers.propTypes {
	handleSubmit: PropTypes.func.isRequired
}

export default ListFollowers;