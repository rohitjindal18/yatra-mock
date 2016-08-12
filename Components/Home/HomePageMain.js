import React from 'react';
import { bindActionCreators} from 'redux';
import { connect} from 'react-redux';

import * as actionCreators from '../../actions/actionCreator.js';
import HomePage from './HomePage.js';

function mapStateToProps(state){
	return {
		state
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators , dispatch);
}

const HomePageMain = connect(mapStateToProps , mapDispatchToProps)(HomePage);

export default HomePageMain;