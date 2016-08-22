const baseConfig = {
  headers : {
    'Content-Type' : 'application/json'
  },
  port : 7777 ,
  host : 'http://localhost'
};
var API = {
  fetchFlightDetails(data) {
    var request = new Request('http://localhost:7777/fetchFlight', {
      method: 'POST', 
      mode: 'cors', 
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body : JSON.stringify(data)
    });
    return fetch(request)
    .then(
      response => response.json())
    .then(response => {
      console.log('fetchFlightDetails success ', response);
      return response;
    });
  }
};

module.exports = API;
