import autobind from 'autobind-decorator'
import {Tabela} from './components/Tabela'
import {Counter} from './components/Counter'



class Main extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			query: '',
			dados: [[]],
			header: [],
			classe: 'esconde',
			transicao: false,
	    };
  	}

  	@autobind
	executar() {
		if (this.state.classe === 'mostra')
			this.setState({
				classe: 'esconde',
				transicao: true,
			});
		axios.get('http://apoema.esalq.usp.br/~getlidar/query.php?query=' + this.state.query.replace(/\n/g, ' \n'))
		  .then(function(response){
		  	if (this.state.transicao)
		  		this.refs.tabela.addEventListener('transitionend', function(){
		  			this.setState({
					dados: response.data.dados,
					header: response.data.campos,
					classe: 'mostra',
				});
		  		}.bind(this)) 	
		  	else
			    this.setState({
					dados: response.data.dados,
					header: response.data.campos,
					classe: 'mostra',
				});
		  }.bind(this));  
	}

	@autobind
	updateQuery(e) {
		this.setState({
			query: e.target.value,
		})
	}

	componentDidMount() {
		this.refs.tabela.addEventListener('transitionend', function(){this.setState({transicao:false})})
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
				<div className={'tabela-div ' + this.state.classe} ref="tabela">
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