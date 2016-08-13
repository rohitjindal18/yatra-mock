import API from '../API/API.js';
export function searchFlight(sourceCity , destinationCity){
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

export function flightSearchData(sourceCity , destinationCity){
	return {
		type : 'FLIGHT_SEARCH_DATA',
		sourceCity ,
		destinationCity
	}
}

export function selectFlightIndex(index) {
	return {
		type : 'FLIGHT_INDEX_SET',
		index
	}
}

export function searchFlightSuccess(data){
	return {
		type : 'FLIGHT_SUCCESS',
		data
	}
}