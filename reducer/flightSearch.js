function appState(state = [] , action){
	switch(action.type){
		case 'SEARCH_FLIGHT':
			console.log('searchFlight Called');
			return state;
		default :
			return state;
	}
}

export default appState;