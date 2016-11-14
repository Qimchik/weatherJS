var AddTab = React.createClass({
	addNewTab: function(){
		this.props.addFunc(document.getElementById('cityName').value);
	},
	render: function() {
		return (
			<div className='sectionForAddTab'>
				<input id="cityName"></input>
				<button onClick={this.addNewTab}> Add new tab</button>
			</div>
		);
	}
});

export {AddTab};