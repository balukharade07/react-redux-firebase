import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import '../../App.css';

class AppNavBar extends Component {
	state = {
		isAuthenticated: false,
	};

	static getDerivedStateFromProps(props, state) {
		const { auth } = props;
		if (auth.uid) {
			return { isAuthenticated: true };
		} else {
			return { isAuthenticated: false };
		}
	}
	onLogoutClick(e) {
		e.preventDefault();
		const { firebase } = this.props;
		firebase.logout();
	}
	render() {
		const { isAuthenticated } = this.state;
		const { auth } = this.props;
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
								{isAuthenticated ? (
									<li className="nav-item">
										<Link to="/Dashboard" className="nav-link">
											dashbord
										</Link>
									</li>
								) : null}
							</ul>
							{isAuthenticated ? (
								<ul className="navbar-nav ml-auto">
									<li className="nav-item">
										<a href="#!" className="nav-link">
											{auth.email}
										</a>
									</li>
									<li className="nav-item">
										<a
											href="#!"
											className="nav-link"
											onClick={this.onLogoutClick.bind(this)}>
											Logout
										</a>
									</li>
								</ul>
							) : null}
						</div>
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

AppNavBar.propTypes = {
	firebase: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

export default compose(
	firestoreConnect(),
	connect((state, props) => ({
		auth: state.firebase.auth,
	})),
)(AppNavBar);
