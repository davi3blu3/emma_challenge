var Application = React.createClass({
	render: function() {
		return (
			<div className="container">
			  <h1 className="text-center title">Link Lookup</h1>
			  <InputForm />
			  <br/>
			  <LinkOutput />
			</div>
		);
	}
});

var InputForm = React.createClass({
	getInitialState: function() {
		return {
			text: ""
		}
	},
	handleChange: function(event) {
		// entering text enables Submit button
		this.setState({text: event.target.value})
	},
	handleSubmit: function(event) {
		event.preventDefault();
		var urlInput = this.state.text;
		if (!urlInput) { return; }
		this.setState({text: ""});
		this.ajaxCall(urlInput);
	},
	ajaxCall: function(urlInput) {
        $.ajax({
            url: 'http://localhost:3000/',
            type: 'GET',
            contentType: 'application/json',
            data: urlInput,
            success: function(data) {
            	console.log(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
	            console.log(xhr.status);
	            console.log(thrownError);
            }
        });
	},
	processLinks: function(rawHtml) {
			console.log('processlinks triggered!');
			var hrefs = /(href=".*?)"/g;
			var links = rawHtml.match(hrefs);
	},
	render: function() {
		return (
			<form className="well url-entry">
	    		<label htmlFor="url">Please enter a URL:</label>
	    		<div className="input-group">
	    			<span className="input-group-addon" id="basic-addon3">http://</span>
	      			<input type="text" className="form-control" id="basic-url" value={this.state.text} onChange={this.handleChange}/>
	      			<span className="input-group-btn">
	        			<button className="btn btn-primary" type="button" disabled={this.state.text.length === 0} onClick={this.handleSubmit}>Submit</button>
	      			</span>
	    		</div>
	  		</form>
		);
	}
});

var LinkOutput = React.createClass({
	getInitialState: function() {
		return {
			// links to be iterated in return statement, if present
			links: ["/react/favicon.ico", "https://facebook.github.io/react/feed.xml", "https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.csso", "/react/css/syntax.css"]
			// links: []
		};
	},
	render: function() {
		var linksList = this.state.links.map(function(link, index){
			return <li className="list-group-item" key={index}>{link}</li>;
		})
		if (this.state.links.length > 0) {
			// section only renders when 'links' data is present
			return (
				<div className="well">
				<h3 className="text-center">Links contained in {URL} markup</h3>
				<ul className="list-group">
					{ linksList }
				</ul>
				</div>
			);
		} else {
			return null;
		}
	}
});

ReactDOM.render(
	<Application />,
	document.getElementById('content')
);
