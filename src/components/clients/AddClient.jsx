import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { compose } from 'redux';
// import { connect } from 'react-redux'
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
	state = {
		fristName: "",
		lastName: "",
		gmail: "",
		phone: "",
		bal: "",
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit(e) {
		e.preventDefault();
		const newClient = this.state;
		const { firestore, history } = this.props;

		if (newClient.bal === "") {
			newClient.bal = 0;
		}

		firestore
			.add({ collection: "clients" }, newClient)
			.then(() => history.push("/"));
	}
	render() {
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-6">
						<Link to="/" className="btn btn-link">
							Back To Dashbord
						</Link>
					</div>
				</div>
				<div className="card">
					<div className="card-header">Add New Client</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit.bind(this)}>
							<div className="form-group">
								<label htmlFor="fristName">fristName</label>
								<input
									type="text"
									className="form-control"
									id="fristName"
									aria-describedby="fristName"
									placeholder="Enter fristName"
									name="fristName"
									onChange={this.onChange}
									value={this.state.fristName}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="lastName">lastName</label>
								<input
									type="text"
									className="form-control"
									id="lastName"
									aria-describedby="lastName"
									placeholder="Enter lastName"
									name="lastName"
									onChange={this.onChange}
									value={this.state.lastName}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="gmail">gmail</label>
								<input
									type="gmail"
									className="form-control"
									id="gmail"
									aria-describedby="gmail"
									placeholder="Enter gmail"
									name="gmail"
									onChange={this.onChange}
									value={this.state.gmail}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="phone">phone</label>
								<input
									type="type"
									className="form-control"
									id="phone"
									aria-describedby="phone"
									placeholder="Enter phone"
									name="phone"
									onChange={this.onChange}
									value={this.state.phone}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="bal">bal</label>
								<input
									type="type"
									className="form-control"
									id="bal"
									aria-describedby="bal"
									placeholder="Enter bal"
									name="bal"
									onChange={this.onChange}
									value={this.state.bal}
									required
								/>
							</div>
							<input
								type="submit"
								value="Submit"
								className="btn btn-primary btn-block"
							/>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
AddClient.propTypes = {
	firestore: PropTypes.object.isRequired,
};
export default firestoreConnect()(AddClient);
