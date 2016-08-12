import React from 'react';

export default class HomePage extends React.Component {
	constructor(){
		super();
		this.state = {
			val : ""
		};
	}
	componentDidMount () {
    	this.props.searchFlight();
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
					<div style={styles.homePageBannerStyle}><img src="./Images/goldengate.jpg" style= {styles.homePageBannerImage}></img></div>
					<div style ={styles.bannerMiddleDiv}>
						<div style = {styles.bannerMiddleSubDiv}>
							<table style={styles.homeBannerTable}>
								<tbody>
									<tr>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} type="text" placeholder="Select Origin"></input>
										</td>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} type="text" placeholder="Select Destination"></input>
										</td>
										<td style={styles.homeBannerTdBig}></td>
										<td style={styles.homeBannerTdBig}></td>
										<td style={styles.homeBannerTdBig}></td>
										<td id="searchTd" style={styles.homeBannerTdSmall}></td>
									</tr>
								</tbody>
							</table>
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
		opacity : 0.3
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
	}
};
