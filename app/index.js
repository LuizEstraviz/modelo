import autobind from 'autobind-decorator'
import {Tabela} from './components/Tabela'



class Main extends React.Component {
	constructor(props) {
	    super(props);
	    this.executar = this.executar.bind(this);
	    this.updateQuery = this.updateQuery.bind(this);
	    this.transitionStopped = this.transitionStopped.bind(this);
	    this.state = {
			query: '',
			dados: [[]],
			header: [],
			transicao: false,
			opacity: 0,
			erroOpacity: 0
	    };
  	}

	executar() {
		if (this.state.opacity === 1 || this.state.erroOpacity === 1)
			this.setState({
				transicao: true,
				opacity: 0,
				erroOpacity: 0,
			});
		axios.get('http://apoema.esalq.usp.br/~getlidar/query.php', {params: {query: this.state.query}})
		  .then(function(response){
		  	if (typeof(response.data) === 'string') {
		  		console.log('string');
		  		var fn = function() {
			  		this.setState({
			  			erro: response.data,
			  			dados: [[]],
						header: [],
			  			erroOpacity: 1,
			  		});
			  		this.refs.tabela.removeEventListener('transitionend', fn, false);
		  			this.refs.erro.removeEventListener('transitionend', fn, false);
		  		}.bind(this);
		  		if (this.state.transicao) {
					this.refs.tabela.addEventListener('transitionend', fn, false); 	
			  		this.refs.erro.addEventListener('transitionend', fn, false);
		  		} else {
					fn();
		  		}
		  	}
		  	else {
		  		var fn = function(){
		  			console.log('rodou fn');
		  			this.setState({
					dados: response.data.dados,
					header: response.data.campos,
					opacity: 1,
				});
		  			this.refs.tabela.removeEventListener('transitionend', fn, false);
		  			this.refs.erro.removeEventListener('transitionend', fn, false);
		  			console.log(JSON.stringify(this.state));
		  		}.bind(this);
			  	if (this.state.transicao) {
			  		console.log('em transicao');
			  		this.refs.tabela.addEventListener('transitionend', fn, false); 	
			  		this.refs.erro.addEventListener('transitionend', fn, false);
			  	}
			  	else {
			  		console.log('já acabou transicao');
				    fn();
			  	}
			  }
		}.bind(this))
	}

	updateQuery(e) {
		this.setState({
			query: e.target.value,
		})
	}

	transitionStopped() {
		console.log('acabou transicao');
		this.setState({
					transicao: false,
				});
	}

	componentDidMount() {
		this.refs.tabela.addEventListener('transitionend', this.transitionStopped);
		this.refs.erro.addEventListener('transitionend', this.transitionStopped);
	}

	componentWillUnmount() {
	 	this.refs.tabela.removeEventListener('transitionend', this.transitionStopped);
	 	this.refs.erro.removeEventListener('transitionend', this.transitionStopped);
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
					</div>
					<div className="col-sm-12 erro" style={{opacity: this.state.erroOpacity}} ref="erro">
							{this.state.erro}
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