import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component {
	render() {
		return (
			<Link to="/client/add" className="btn btn-success btn-block">
				<i className="fas fas-plus" /> New
			</Link>
		);
	}
}

export default SideBar;
