export var WeatherView = React.createClass({
	componentDidUpdate:function() {
		if(this.props.fullWeather){
			document.getElementById('bgWeather').style=
				"background: url('img/"+this.props.fullWeather.weather[0].main+".gif');\
				background-size: 100% auto;";
		} return true;
	},
	check:function() {
		if(this.props.fullWeather === null) return <div className="weatherView"><h2>Add city. Thank you</h2></div>
		return (<div className="weatherView"><h2>{this.props.fullWeather.name}</h2>
			<p>main: {this.props.fullWeather.weather[0].main}</p>
			<div>
				<img src='img/termp.jpg' height='100px' alt='img'/>
				<p>Maximum temperature: {this.props.fullWeather.main.temp_max}</p>
				<p>Temperature: {this.props.fullWeather.main.temp_max}</p>
				<p>Minimum temperature: {this.props.fullWeather.main.temp_min}</p>
			</div>
			<p>main: {this.props.fullWeather.weather[0].main}</p>
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