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
			transicao: false,
			opacity: 0,
			erro:''
	    };
  	}

  	@autobind
	executar() {
		if (this.state.opacity === 1)
			this.setState({
				transicao: true,
				opacity: 0,
			});
		axios.get('http://apoema.esalq.usp.br/~getlidar/query.php?query=' + this.state.query.replace(/\n/g, ' \n'))
		  .then(function(response){
		  	if(typeof(response.data) === 'string') {
		  		this.setState({
		  			erro: response.data,
		  			header: [],
		  			dados: [[]]
		  		});
		  	}
		  	else {
		  		var fn = function(){
		  			this.setState({
					dados: response.data.dados,
					header: response.data.campos,
					opacity: 1,
					erro: '',
				});
		  			this.refs.table.removeEventListener('transitionend', fn);
		  		}.bind(this);
			  	if (this.state.transicao)
			  		this.refs.tabela.addEventListener('transitionend', fn); 	
			  	else
				    fn();
			  } 
		}.bind(this))
	}

	@autobind
	updateQuery(e) {
		this.setState({
			query: e.target.value,
		})
	}

	render() {
		return (
			<div className="jumbotron col-sm-12 text-center">
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
					<div className="col-sm-12 outer">
						<div className="tabela-div" style={{opacity: this.state.opacity}} ref="tabela">
							<Tabela header={this.state.header} data={this.state.dados} />
						</div>
						<div className="erro">
							{this.state.erro}
						</div>
					</div>
				</div>
			</div>
			);
	}
}

ReactDOM.render(
	<Main />,
	document.getElementById('app')
	);