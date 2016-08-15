import React from 'react';
import { bindActionCreators} from 'redux';
import { connect} from 'react-redux';

import * as actionCreators from '../../actions/actionCreator.js';
import Flight from './Flight.js';

function mapStateToProps(state){
	return {
		state
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators , dispatch);
}

const FlightMain = connect(mapStateToProps , mapDispatchToProps)(Flight);

export default FlightMain;