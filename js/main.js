import {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {AddTab} from './components/addtabs';
import {Tab} from './components/tab';
import {WeatherView} from './components/view';

var WeatherApp = React.createClass({
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
		if(xmlhttp.status !== 200) {
			alert('We cant find your city. Sorry');
			return false;
		}
		json=eval( '('+xmlhttp.responseText+')' )
		return json;
	},
	getInitialState: function(){
		let jsonArr=[],
			jsonFunc = this.getJson,
			current=null;

		if (localStorage.getItem('fullWeather')) {
			this.tabsArr=JSON.parse(localStorage.getItem('tabsArr'));
			current=JSON.parse(localStorage.getItem('fullWeather'));
		}

		this.tabsArr.map(function(tab) {
			jsonArr.push(jsonFunc(tab));
		});
		return {'jsonArr':jsonArr,fullWeather:current};
	},
	handleWeatherUpdate: function(newCurrentTab) {
		this.setLocalStorage();
		this.setState({
			fullWeather: newCurrentTab
		})
		localStorage.setItem('fullWeather',JSON.stringify(newCurrentTab));
		localStorage.setItem('tabsArr',JSON.stringify(this.tabsArr));
	},
	mapArr: function(that) {
		let jsx=that.state.jsonArr.map(function(tab) {
			return (<Tab key={tab.id} 
				current={that.state.fullWeather?tab.id === that.state.fullWeather.id:false} 
				tabLink = {tab} 
				removeTab={that.removeTab}
				fullWeather={that.handleWeatherUpdate}/>)
		})
		return jsx;
	},
	setLocalStorage: function() {
		localStorage.setItem('fullWeather',JSON.stringify(this.state.fullWeather));
		localStorage.setItem('tabsArr',JSON.stringify(this.tabsArr));
	},
	addTab: function(city) {
		if(this.state.jsonArr.length>5) {
			alert('Too much tabs. Please remove any tab to create new.');
			return false;
		}
		let tab = this.getJson('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=5eca46ddb92cb7b41c092d7991685bf5');
		let repeatCity = false;

		this.state.jsonArr.map(function(item){
			if(item.id === tab.id){
				repeatCity = true;
				return false;
			}
		});

		if(repeatCity) {
			alert('You have added this city already.');
			return false;
		}

		if (tab){	
			this.state.jsonArr.push(tab);
			this.tabsArr.push('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=5eca46ddb92cb7b41c092d7991685bf5');
			this.handleWeatherUpdate(this.state.fullWeather);
		}
		
	},
	removeTab: function(tab) {
		this.tabsArr.splice(this.state.jsonArr.indexOf(tab),1);
		this.state.jsonArr.splice(this.state.jsonArr.indexOf(tab),1);
		this.handleWeatherUpdate(this.state.fullWeather);

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