import API from '../API/API.js';
export function searchFlight(){
	return (dispatch) => {
		API.fetchFlightDetails({
        "sourceCity": "Bangalore",
        "destinationCity": "Delhi"
      }).
		then((response) => {
				return dispatch({
					type : 'SEARCH_FLIGHT',
					response
				})
		});
	}
}

export function searchFlightSuccess(data){
	return {
		type : 'FLIGHT_SUCCESS',
		data
	}
}