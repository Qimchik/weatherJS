export var WeatherApp = React.createClass({
	tabsArr: [
	'http://api.openweathermap.org/data/2.5/weather?q=London&appid=5eca46ddb92cb7b41c092d7991685bf5',
	'http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=5eca46ddb92cb7b41c092d7991685bf5'],
	getXmlHttp: function () {
	    var xmlhttp;
	    try {
	        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	       try {
	            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	        } catch (E) {
	            xmlhttp = false;
	        }
	    }
	    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
	        xmlhttp = new XMLHttpRequest();
	    }
	    return xmlhttp;
	},
	getJson: function (url){
		let xmlhttp = this.getXmlHttp(),
		json;
		    xmlhttp.open('GET', url, false);
		    xmlhttp.send(null);
		    json=eval( '('+xmlhttp.responseText+')' )
		    //console.log(json);
		return json;
	},
	getInitialState: function(){
		let jsonArr=[],
			jsonFunc = this.getJson;

		this.tabsArr.map(function(tab) {
			jsonArr.push(jsonFunc(tab));
		});
		return {'jsonArr':jsonArr,fullWeather:null};
	},
	handleWeatherUpdate: function(newTab) {
      	this.setState({
        	fullWeather: newTab
    	})
  	},
	render: function() {
		return (
			<div>
				<AddTab />
				<div className="tabs">
				{
					this.state.jsonArr.map(function(tab) {
						return (<Tab key={Math.random(100)} tabLink = {tab}/>)
					})
				}
				</div>
				<WeatherView />
			</div>
		);
	}
});