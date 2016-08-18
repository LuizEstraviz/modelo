import autobind from 'autobind-decorator'

class Main extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			query: ''
	    };
  	}

  	@autobind
	executar() {
		axios.get('http://apoema.esalq.usp.br/~getlidar/query.php?query=' + this.state.query)
		  .then(function(response){
		    console.log(response.data); // ex.: { user: 'Your User'}
		    console.log(response.status); // ex.: 200
		  });  
	}

	@autobind
	updateQuery(e) {
		this.setState({
			query: e.target.value
		})
	}

	render() {
		return (
			<div className="jumbotron col-sm-6 col-sm-offset-3 text-center">
				<h1>Digite o código SQL</h1>
				<div className="col-sm-12">
					<form>
						<div className="form-group">
							<textarea  className="form-control"
							placeholder="Digite a consulta SQL" 
							type="text" 
							rows="5" 
							onChange={this.updateQuery}
							value={this.state.query}/> 
						</div>
						<div className="form-group col-sm-4 col-sm-offset-4">
							<div
							className="btn btn-block btn-success" 
							onClick={this.executar}>
								Query
							</div>
						</div>
					</form>
				</div>
			</div>
			);
	}
}

ReactDOM.render(
	<Main />,
	document.getElementById('app')
	);