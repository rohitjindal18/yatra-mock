export function searchFlight(){
	return{
		type : 'SEARCH_FLIGHT'
	}
}

export function searchFlightSuccess(data){
	return {
		type : 'FLIGHT_SUCCESS',
		data
	}
}