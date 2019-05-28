import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class Clients extends Component {
    render() {
        const { clients } = this.props;

        if(clients){
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Clients</h2>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
                <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.firstName} {client.lastName}</td>
                                <td>{client.email}</td>
                                <td>{client.bal}</td>
                                <td><Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                                    Details
                                </Link></td>
                            </tr>

                        ))}
                    </tbody>
                </table>
                </React.Fragment>
                )
        } else{
            return(
                <h1>Loading...</h1>
            )
        }
       
    }
}

Clients.propTypes = {
    firestore:PropTypes.object.isRequired,
    clients:PropTypes.array
}


export default compose(
    firestoreConnect([{collection:'clients'}]),
    connect((state,props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);