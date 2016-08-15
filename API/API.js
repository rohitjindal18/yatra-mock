var API = {
  getDashboard (email) {
    email = email.toLowerCase().trim();
    return fetch(`https://cheapass.in/api/dashboard/tracks/${email}`)
    .then((response) => response.json());
  },

  fetchFlightDetails(data) {
    console.log("qqq"+JSON.stringify(data))
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
    .then(response => response.json())
    .then(response => {
      console.log('fetchFlightDetails success ', response);
      return response;
    });
  }
};

module.exports = API;
