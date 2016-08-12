import React from 'react';
import { browserHistory } from 'react-router';

export default class HomePage extends React.Component {
	constructor(){
		super();
		this.state = {
			val : ""
		};
	}

  	searchFlights() {
  		var sourceC = this.refs.sourceCity.value;
  		var destinationC = this.refs.destinationCity.value;
  		this.props.flightSearchData(sourceC , destinationC);
  		browserHistory.push('/flight');
  	}

	render() {
		return(
				<div style={styles.homePageBannerStyle}>
					<div style={styles.homePageBannerStyle}><img src="./Images/goldengate.jpg" style= {styles.homePageBannerImage}></img></div>
					<div style={styles.homeheading}>
						<div style={styles.flightsHeading}> 
							<strong>FLIGHTS</strong>
						</div>
						<div style={styles.busesHeading}>
							<strong>BUSES</strong>
						</div>
					</div>
					<div style ={styles.bannerMiddleDiv}>
						<div style = {styles.bannerMiddleSubDiv}>
							<table style={styles.homeBannerTable}>
								<tbody>
									<tr>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} type="text" placeholder="Select Origin" ref="sourceCity"></input>
										</td>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} type="text" placeholder="Select Destination" ref="destinationCity"></input>
										</td>
										<td style={styles.homeBannerTdBig}></td>
										<td style={styles.homeBannerTdBig}></td>
										<td style={styles.homeBannerTdBig}></td>
										<td id="searchTd" style={styles.homeBannerTdSmall} onClick={this.searchFlights.bind(this)}></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div style = {styles.bottomBanners}>
						<div style ={styles.bannerFirst}>
							LOWEST FARE FINDER
							
						</div>
						<div style ={styles.bannerRest}>
						LOWEST FARE FINDER
							
						</div>
						<div style ={styles.bannerRest}>
						LOWEST FARE FINDER
							
						</div>
						<div style ={styles.bannerRest}>
						LOWEST FARE FINDER
							
						</div>
					</div>
				</div>
			);
	}
}

var styles = {
	homePageBannerStyle : {
			width : '100%',
			height : 550,
			top : 0,
			left : 0,
			position : 'absolute'
	},
	homePageBannerImage : {
		width : '100%',
		height : 550,
		opacity : 0.5
	},
	bannerMiddleDiv : {
		position : 'absolute',
		marginLeft : 200 ,
		marginTop : 200 ,
		width : 1000 , 
		height : 130,
		backgroundColor : '#282929',
		opacity : 0.8
	},
	bannerMiddleSubDiv : {
		width : 950,
		margin : 'auto',
		height : 44,
		marginTop : 50,
		backgroundColor : 'white',
		opacity : 1
	} ,
	homeBannerTable : {
		borderCollapse: 'collapse',
		borderRadius : 8,
		opacity : 1
	},
	homeBannerTdBig : {
		width : 177 ,
		height : 44 ,
		backgroundColor : 'white',
		border : '1px solid #282929',
		borderRadius : 8,
		overflow : 'hidden',
	} ,
	homeBannerTdSmall : {
		width : 65 ,
		height : 44,
		backgroundColor : '#4A90E2'
	},
	input : {
		homeBannerTdBig : {
			width : '100%',
			height : '100%',
			border : 'none',
			fontFamily : 'Proxima Regular',
			fontSize : 16,
			opacity : 1
		}
	},
	homeheading : {
		position : 'absolute',
		marginLeft : 200 ,
		marginTop : 180 ,
		width : 1000 , 
		height : 120 ,
		display : 'inline-flex'
	},
	flightsHeading : {
		width : 100,
		height : 80,
		color : 'black',
		opacity : 0.9,
		color : 'black'
	},
	busesHeading : {
		width : 100,
		height : 80,
		color : 'black',
		opacity : 0.9,
		color : 'black'
	},
	bottomBanners : {
		position : 'absolute',
		marginTop : 420,
		width : '100%',
		height : 150 ,
		display : 'inline-flex'
	},
	bannerFirst : {
		marginLeft : 150,
		width : 250 ,
		height : 120 ,
		backgroundColor : 'black',
		color : 'white',
		lineHeight: 7,
		textAlign : 'center'
	},
	bannerRest : {
		marginLeft : 50,
		width : 250 ,
		height : 120 ,
		backgroundColor : 'black',
		color : 'white',
		lineHeight: 7,
		textAlign : 'center'
	}
};
