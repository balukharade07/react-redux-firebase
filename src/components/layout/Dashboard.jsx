import React, { Component } from 'react';
import Client from '../clients/Client';
import SideBar from '../layout/SideBar';

class Dashboard extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-md-10">
					<Client />
				</div>
				<div className="col-md-2">
					<SideBar />
				</div>
			</div>
		);
	}
}

export default Dashboard;
