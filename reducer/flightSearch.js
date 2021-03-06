
const initialState = {
      sourceCity: "",
	  destinationCity: "",
	  flights : [],
	  flightIndex : -1,
	  travellerCount : 0
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
				destinationCity : action.destinationCity,
				travellerCount : action.peopleCount
			};
		case 'FLIGHT_INDEX_SET':
			return {
				...state ,
				flightIndex : action.index
			};
		default :
			return state;
	}
}

export default appState;