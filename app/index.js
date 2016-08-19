import autobind from 'autobind-decorator'
import {Tabela} from './components/Tabela'
import {Counter} from './components/Counter'



class Main extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			query: '',
			dados: [[]],
			header: []
	    };
  	}

  	@autobind
	executar() {
		var that = this;
		axios.get('http://apoema.esalq.usp.br/~getlidar/query.php?query=' + this.state.query.replace('\n', ' \n'))
		  .then(function(response){
		  	console.log(response.data.dados);
		    that.setState({
				dados: response.data.dados,
				header: response.data.campos
			});
		  }.bind(this));  
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
				<h1>Fazenda modelo</h1>
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
								Rodar
							</div>
						</div>
					</form>
				</div>
				<div>
				<Tabela header={this.state.header} data={this.state.dados} />
				</div>
			</div>
			);
	}
}

ReactDOM.render(
	<Main />,
	document.getElementById('app')
	);