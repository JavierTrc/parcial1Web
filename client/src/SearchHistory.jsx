import React, {Component} from "react";
import PropTypes from "prop-types";

class SearchHistory extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(login){
		this.props.handleClick(login, false, login);
	}

	render(){
		return (
			<nav className="breadcrumb">
				{this.props.history.map((user, i)=>{
					return (
						<a className="breadcrumb-item" href="#" key={i} onClick={()=>this.handleClick(user)}>{user}</a>
					);
				})}
			</nav>
		);
	}
}

SearchHistory.propTypes = {
	handleClick: PropTypes.func.isRequired,
	history: PropTypes.array.isRequired
};

export default SearchHistory;
