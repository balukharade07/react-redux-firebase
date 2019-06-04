import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit(e) {
		e.preventDefault();

		const { firebase, history } = this.props;
		const { email, password } = this.state;

		firebase
			.login({
				email,
				password,
			})
			.catch(err => alert('invalid login'));

		this.setState({
			email: '',
			password: '',
		});
		history.push('/');
	}
	render() {
		const { email, password } = this.state;
		return (
			<div className="row">
				<div className="col-md-7 mx-auto ">
					<div className="card">
						<div className="cart-body">
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary">Login</span>
							</h1>
							<form className="p-3" onSubmit={this.onSubmit.bind(this)}>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">Email address</label>
									<input
										type="email"
										className="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Enter email"
										autoComplete="OFF"
										required
										name="email"
										value={email}
										onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Password</label>
									<input
										type="password"
										className="form-control"
										id="exampleInputPassword1"
										placeholder="Password"
										required
										name="password"
										value={password}
										onChange={this.onChange}
									/>
								</div>

								<button type="submit" className="btn btn-primary btn-block">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	firebase: PropTypes.object.isRequired,
};

export default firestoreConnect()(Login);
