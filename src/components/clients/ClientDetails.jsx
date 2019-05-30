import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
// import Spinner from '../layout/Spinner';

class ClientDetails extends Component {
    render() {
    
      console.log(this.props);
        return (
                <React.Fragment>
                    {/* <h1>{this.props.client.fristName}</h1> */}
                </React.Fragment>
              );
     }
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients',storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered }}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);