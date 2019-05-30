import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
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
					<div className="row">
						<div className="col-md-3">
							<h2>First Name:-</h2>
							<h2>Last Name:-</h2>
							<h2>Gmail:-</h2>
							<h2>Balance:-</h2>
							<h2>Phone:-</h2>
						</div>
						<div className="col-md-4">
							<h2>{client.fristName}</h2>
							<h2>{client.lastName}</h2>
							<h2>{client.gmail}</h2>
							<h2>${parseFloat(client.bal).toFixed(2)}</h2>
							<h2>{client.phone}</h2>
						</div>
					</div>
				</React.Fragment>
			);
		} else {
			return <Spinner />;
		}
	}
}

export default compose(
	firestoreConnect(props => [
		{ collection: "clients", storeAs: "client", doc: props.match.params.id },
	]),
	connect(({ firestore: { ordered } }, props) => ({
		client: ordered.client && ordered.client[0],
	})),
)(ClientDetails);
