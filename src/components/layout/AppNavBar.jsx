import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AppNavBar extends Component {
	render() {
		return (
			<React.Fragment>
				<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
					<div className="container">
						<Link to="/" className="navbar-brand">
							ClientPanel
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon" />
						</button>

						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<Link to="/Dashboard" className="nav-link">
										dashbord
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default AppNavBar;
