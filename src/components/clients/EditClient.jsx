import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
	constructor(props) {
		super(props);
		this.fristNameInput = React.createRef();
		this.lastNameInput = React.createRef();
		this.gmailInput = React.createRef();
		this.phoneInput = React.createRef();
		this.balInput = React.createRef();
	}

	onSubmit(e) {
		e.preventDefault();
		const { client, firestore, history } = this.props;

		//Update Client
		const updClient = {
			fristName: this.fristNameInput.current.value,
			lastName: this.lastNameInput.current.value,
			gmail: this.gmailInput.current.value,
			phone: this.phoneInput.current.value,
			bal: this.balInput.current.value === '' ? 0 : this.balInput.current.value,
		};
		// Update Firestore
		firestore
			.update({ collection: 'clients', doc: client.id }, updClient)
			.then(history.push('/'));
	}
	render() {
		const { client } = this.props;
		if (client) {
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
						<div className="card-header">Edit Client</div>
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
										defaultValue={client.fristName}
										ref={this.fristNameInput}
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
										defaultValue={client.lastName}
										ref={this.lastNameInput}
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
										defaultValue={client.gmail}
										ref={this.gmailInput}
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
										defaultValue={client.phone}
										ref={this.phoneInput}
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
										defaultValue={client.bal}
										ref={this.balInput}
										required
									/>
								</div>
								<input
									type="submit"
									defaultValue="Submit"
									className="btn btn-primary btn-block"
								/>
							</form>
						</div>
					</div>
				</React.Fragment>
			);
		} else {
			return <Spinner />;
		}
	}
}

EditClient.propTypes = {
	firestore: PropTypes.object.isRequired,
};

export default compose(
	firestoreConnect(props => [
		{
			collection: 'clients',
			storeAs: 'client',
			doc: props.match.params.id,
		},
	]),
	connect(({ firestore: { ordered } }, props) => ({
		client: ordered.client && ordered.client[0],
	})),
)(EditClient);
