import API from '../API/API.js';
export function searchFlight(sourceCity , destinationCity){
	return (dispatch , getState) => {
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

export function flightSearchData(sourceCity , destinationCity , peopleCount){
	return {
		type : 'FLIGHT_SEARCH_DATA',
		sourceCity ,
		destinationCity,
		peopleCount
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