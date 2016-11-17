export var WeatherView = React.createClass({
	componentDidMount:function() {
		if(this.props.fullWeather){
			document.getElementById('bgWeather').style=
				"background: url('img/"+this.props.fullWeather.weather[0].main+".gif');\
				background-size: 100% auto;";
			document.getElementById('wind').style=
			"transform: rotate("+this.props.fullWeather.wind.deg+"deg);"+
			"-moz-transform: rotate("+this.props.fullWeather.wind.deg+"deg);"+
    		"-ms-transform: rotate("+this.props.fullWeather.wind.deg+"deg);"+
    		"-webkit-transform: rotate("+this.props.fullWeather.wind.deg+"deg);"+
    		"-o-transform: rotate("+this.props.fullWeather.wind.deg+"deg)";
		} 
		else {
			document.getElementById('bgWeather').style=
				"background: none";
		}
		return true;
	},
	componentDidUpdate:function() {
		this.componentDidMount();
	},
	check:function() {
		if(this.props.fullWeather === null) return <div className="weatherView"><h2>Choose city. Thank you</h2></div>
		return (<div className="weatherView"><h2>{this.props.fullWeather.name}</h2>
			<p>There are {this.props.fullWeather.weather[0].main} here</p>
			<div className="temperature">
				<img src='img/termp.jpg' height='100px' alt='img'/>
				<p>Max temperature: {this.props.fullWeather.main.temp_max}</p>
				<p>Temperature: {this.props.fullWeather.main.temp_max}</p>
				<p>Min temperature: {this.props.fullWeather.main.temp_min}</p>
			</div>
			<div className="wind">
			<p>Wind speed: {this.props.fullWeather.wind.speed}</p>
			<img id="wind" src="img/arrow.gif" height="50px"alt="img"/>
			</div>
		</div>)
	},
	render: function() {
		return (
			<div id="bgWeather" className="bgWeather" >	
					{this.check()}
			</div>
		);
	}
});