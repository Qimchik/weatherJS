export var Tab = React.createClass({
	handleTabChange: function(e) {
    	this.props.fullWeather(this.props.tabLink);
  	},
	render: function() {
		return (
				<div className={this.props.current?'tab currentTab':'tab'} onClick={this.handleTabChange}>
				<img src={'https://2ip.ru/img/flags/'+this.props.tabLink.sys.country+'.gif'} alt='ico'/>
				<span className="city">{ this.props.tabLink.name }</span>
				</div>
		);
	}
});