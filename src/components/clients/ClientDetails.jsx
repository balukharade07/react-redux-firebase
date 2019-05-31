import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

class ClientDetails extends Component {
	state = {
		showBalanceUpdate: false,
		balanceUpdateAmount: '',
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onBalanceSubmit = e => {
		e.preventDefault();
		// console.log(this.state.balanceUpdateAmount);
		const { client, firestore } = this.props;
		const { balanceUpdateAmount } = this.state;

		const clientUpdate = {
			bal: parseFloat(balanceUpdateAmount),
		};

		//Update fireStore
		firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);

		this.setState({
			balanceUpdateAmount: '',
		});
	};

	//Delete Client
	deleteClick = () => {
		const { client, firestore, history } = this.props;

		firestore
			.delete({ collection: 'clients', doc: client.id })
			.then(() => history.push('/'));
	};

	render() {
		const { client } = this.props;
		const { showBalanceUpdate, balanceUpdateAmount } = this.state;

		let balanceForm = '';

		if (showBalanceUpdate) {
			balanceForm = (
				<form onSubmit={this.onBalanceSubmit}>
					<div className="row">
						<div className="form-group col-sm-8">
							<input
								type="text"
								className="form-control"
								id="balanceUpdateAmount"
								aria-describedby="balanceUpdateAmount"
								placeholder="Add new Bal"
								name="balanceUpdateAmount"
								onChange={this.onChange}
								value={balanceUpdateAmount}
								required
							/>
						</div>
						<div className="input-group-append col-sm-4">
							<input
								style={{ height: '36px', padding: '5px 19px' }}
								type="submit"
								value="Update"
								className="btn btn-outline-dark"
							/>
						</div>
					</div>
				</form>
			);
		} else {
			balanceForm = null;
		}

		if (client) {
			return (
				<React.Fragment>
					<div className="row mb-5">
						<div className="col-md-6">
							<Link to="/" className="btn btn-link">
								Back To Dashbord
							</Link>
						</div>
						<div className="col-md-6">
							<div className="btn-group float-right">
								<Link to={`/client/edit/${client.id}`} className="btn btn-dark">
									Edit
								</Link>
								<button onClick={this.deleteClick} className="btn btn-danger">
									Delete
								</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="card col-lg-12">
							<h5 className="card-header">
								{client.fristName} {client.lastName}
							</h5>
							<div className="card-body">
								<div className="row">
									<div className="col-md-8 col-sm-6">
										<h4>client ID:- {client.id}</h4>
									</div>
									<div className="col-md-4 col-sm-6">
										<h3>
											Balance :{' '}
											<span
												className={classnames({
													'text-danger': client.bal === 0,
													'text-success': client.bal > 0,
												})}>
												${parseFloat(client.bal).toFixed(2)}{' '}
											</span>
											<small>
												<a
													href="#!"
													onClick={() =>
														this.setState({
															showBalanceUpdate: !this.state.showBalanceUpdate,
														})
													}>
													Edit Bal
												</a>
											</small>
										</h3>
										{balanceForm}
									</div>
								</div>
								<hr />
								<ul className="list-group">
									<li className="list-group-item">
										Contact Email: {client.gmail}
									</li>
									<li className="list-group-item">
										Contact Phone: {client.phone}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</React.Fragment>
			);
		} else {
			return <Spinner />;
		}
	}
}

ClientDetails.propTypes = {
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
)(ClientDetails);
