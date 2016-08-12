import API from '../API/API.js';
export function searchFlight(sourceCity , destinationCity){
	console.log("qw"+sourceCity);
	return (dispatch) => {
		API.fetchFlightDetails({
        "sourceCity": sourceCity,
        "destinationCity": destinationCity
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