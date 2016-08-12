import React from 'react';
import ReactDOM from 'react-dom';
import HomePageMain from './Components/Home/HomePageMain.js';
import FlightMain from './Components/Flights/FlightMain.js';
import store from './store/configStore.js';
import { Provider } from 'react-redux';

import {Router} from 'react-router';
import {DefaultRoute , Link , Route , RouteHandler , browserHistory , IndexRoute} from 'react-router';

class App extends React.Component {
  render() {
    return (
    	<Provider store={store}>
      		<HomePageMain {...this.props}/>
    	</Provider>
    );
  }
}

class Flightmain extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <FlightMain {...this.props}/>
      </Provider>
    );
  }
}


var route = (
		<Router history={browserHistory}>
        <Route path='/' component={App}/>
        <Route path='/flight' component={Flightmain}/>
		</Router>
);

ReactDOM.render(route, document.getElementById("root-div"));