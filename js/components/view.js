export var WeatherView = React.createClass({
	render: function() {
		return (
			<div className="weatherView">
				{JSON.stringify(this.props.fullWeather)}
			</div>
		);
	}
});