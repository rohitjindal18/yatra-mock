import React from 'react';
import { bindActionCreators} from 'redux';
import { connect} from 'react-redux';

import * as actionCreators from '../../actions/actionCreator.js';
import Booking from './Booking.js';

function mapStateToProps(state){
	return {
		state
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators , dispatch);
}

const BookingMain = connect(mapStateToProps , mapDispatchToProps)(Booking);

export default BookingMain;