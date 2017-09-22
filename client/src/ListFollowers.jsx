import React, { Component } from "react";
import PropTypes from "prop-types";

class ListFollowers extends Component {
	constructor(props){
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(user){
		this.props.handleNewUser(user, false, undefined);
	}

	render(){
		return (
			<div className="row">
				{this.props.followers.map(follower => {
					let alt = "Image of " + follower.login;
					return (<div className="card col-md-4 mb-4 mx-auto" onClick={() => this.onClick(follower.login)} key={follower.id}>
							<img className="card img-top img-fluid" src={follower.avatar_url} alt={alt}></img>
							<div className="card-block">
								<h4 className="card-title">{follower.login}</h4>
								<a className="btn btn-primary" href={follower.html_url}>Go to Github</a>
							</div>
						</div>);
				})}
			</div>
		);
	}
}

ListFollowers.propTypes = {
	handleNewUser: PropTypes.func.isRequired
};

export default ListFollowers;
