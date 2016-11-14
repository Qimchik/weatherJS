import {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {AddTab} from './components/addtabs';
import {Tab} from './components/tab';
import {WeatherView} from './components/view';

var WeatherApp = React.createClass({
	tabsArr: [
	'http://api.openweathermap.org/data/2.5/weather?q=London&appid=5eca46ddb92cb7b41c092d7991685bf5',
	'http://api.openweathermap.org/data/2.5/weather?q=Kharkov&appid=5eca46ddb92cb7b41c092d7991685bf5',
	'http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=5eca46ddb92cb7b41c092d7991685bf5',
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
		console.log(xmlhttp.status);
		if(xmlhttp.status !== 200) return false;
		json=eval( '('+xmlhttp.responseText+')' )
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
	handleWeatherUpdate: function(newCurrentTab) {
		this.setState({
			fullWeather: newCurrentTab
		})
	},
	mapArr: function(that) {
		let jsx=that.state.jsonArr.map(function(tab) {
			return (<Tab key={tab.id} 
				current={that.state.fullWeather === null?false:tab.id === that.state.fullWeather.id} 
				tabLink = {tab} 
				fullWeather={that.handleWeatherUpdate}/>)
		})
		return jsx;
	},
	addTab: function(city) {
		let tab = this.getJson('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=5eca46ddb92cb7b41c092d7991685bf5');
		if (tab){	
			this.state.jsonArr.push(tab);
			this.handleWeatherUpdate(this.state.fullWeather);
		}
	},
	render: function() {
		return (
			<div>
				<AddTab addFunc={this.addTab} />
				<div className="tabs">
				{
					this.mapArr(this)
				}
				</div>
				<WeatherView fullWeather={this.state.fullWeather}/>
			</div>
		);
	}
});

ReactDOM.render(
	<WeatherApp />,
	document.getElementById("container")
);