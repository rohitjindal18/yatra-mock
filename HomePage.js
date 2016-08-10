import React from 'react';

export default class HomePage extends React.Component {
	constructor(){
		super();
		this.state = {
			val : ""
		};
	}
	clickMe() {
		var component = this;
		fetch("http://localhost:7777/users",{
		}).then(function(response) {
				console.log(response.status);
				component.setState({
					val : response.status
					});
		});
	}
	render() {
		return(
				<div style={styles.homePageBannerStyle}>
					<div style={styles.homePageBannerStyle}></div>
				</div>
			);
	}
}

var styles = {
	homePageBannerStyle : {
			width : '100%',
			height : 500,
			backgroundColor : 'red',
			top : 0,
			left : 0,
			right : 0
	}
};
