
const initialState = {
      sourceCity: "",
	  destinationCity: "",
	  flights : []
};

function appState(state = initialState , action){
	switch(action.type){
		case 'SEARCH_FLIGHT':
			return{
				...state,
				flights : action.response
			};
		case 'FLIGHT_SEARCH_DATA':
			return{
				...state,
				sourceCity : action.sourceCity,
				destinationCity : action.destinationCity
			};
		default :
			return state;
	}
}

export default appState;