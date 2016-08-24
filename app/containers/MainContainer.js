import { Tabela } from '../components/Tabela';
import { Imagem } from '../components/Imagem';
import { Collapse, Well, Panel } from 'react-bootstrap';
//import { Mapa } from './Mapa';
import $ from 'JQuery';

export class MainContainer extends React.Component {
	constructor(props) {
	    super(props);
	    // Bind functions to 'this' context
	    this.executar = this.executar.bind(this);
	    this.updateQuery = this.updateQuery.bind(this);
	    this.transitionStopped = this.transitionStopped.bind(this);

	    // Set initial state
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
		// If there any error or table is shown hide them and transition
		if (this.state.opacity === 1 || this.state.erroOpacity === 1)
			this.setState({
				transicao: true,
				opacity: 0,
				erroOpacity: 0,
			});

		// If asCsv then open regular as regular link for download
		if (this.refs.asCsv.checked) {
			window.location.replace('http://apoema.esalq.usp.br/~getlidar/query.php?query=' + this.state.query.replace(/\n/g, ' \n') + '&ascsv=true');
			return;
		}
		// Perform get request for query
		axios.get('http://apoema.esalq.usp.br/~getlidar/query.php', {
			params: {
				query: this.state.query,
			},
			headers: {contentType: "text/plain; charset=utf-8"},
		})
		  .then(function(response){
		  	// If response is simple string then it is an error
		  	if (typeof(response.data) === 'string') {
		  		// Set error and clean data for table
		  		var fn = function() {
			  		this.setState({
			  			erro: response.data,
			  			dados: [[]],
						header: [],
			  			erroOpacity: 1,
			  		});
			  		// Remove listener for tabela and erro
			  		this.refs.tabela.removeEventListener('transitionend', fn, false);
		  			this.refs.erro.removeEventListener('transitionend', fn, false);
		  		}.bind(this);

				// If is in transition wait for transitionend
		  		if (this.state.transicao) {
					this.refs.tabela.addEventListener('transitionend', fn, false); 	
			  		this.refs.erro.addEventListener('transitionend', fn, false);
		  		} 
				// If not in transition set error and clean data
		  		else {
					fn();
		  		}
		  	}
		  	// If response is object then it is data for table
		  	if (typeof(response.data) === 'object') {
		  		// Set data for table
		  		var fn = function(){
		  			this.setState({
					dados: response.data.dados,
					header: response.data.campos,
					opacity: 1,
				});
		  			// Remove listener for tabela and erro
		  			this.refs.tabela.removeEventListener('transitionend', fn, false);
		  			this.refs.erro.removeEventListener('transitionend', fn, false);
		  		}.bind(this);

		  		// If is in transition wait for transitionend
			  	if (this.state.transicao) {
			  		this.refs.tabela.addEventListener('transitionend', fn, false); 	
			  		this.refs.erro.addEventListener('transitionend', fn, false);
			  	}
			  	// If not in transition set data for table
			  	else {
				    fn();
			  	}
			  }
		}.bind(this))
	}

	// function to run when query textarea is updated
	updateQuery(e) {
		this.setState({
			query: e.target.value,
		})
	}

	// When transition ends set transicao state to false
	transitionStopped() {
		this.setState({
					transicao: false,
				});
	}

	// When component is mount set event listener to broadcast that transition in not in progress
	componentDidMount() {
		this.refs.tabela.addEventListener('transitionend', this.transitionStopped);
		this.refs.erro.addEventListener('transitionend', this.transitionStopped);
	}

	// When component will unmoun unset previous event listener
	componentWillUnmount() {
	 	this.refs.tabela.removeEventListener('transitionend', this.transitionStopped);
	 	this.refs.erro.removeEventListener('transitionend', this.transitionStopped);
	}

	// Main render function to output to app div
	render() {
		return (
			// Main div block with gray background
                <div className="jumbotron col-sm-12 text-center">
				<div className="col-sm-12 text-center">
					<div className="col-sm-12 text-center" style={{marginBottom: 15}}>
						{/* Imagem recolhível */}
						<Collapse in={this.state.open}>
							<Panel className="height200" style={{overflow: "auto", resize: "vertical"}}>
            					<Well>
									<Imagem />
								</Well>
							</Panel>
						</Collapse>
						<button type="button" className="btn btn-info" onClick={ () => this.setState({ open: !this.state.open })}>Mostrar esquema</button>
					</div>
				{ /* Form input with textarea and a button run sql */ }
					<form>
						<div className="form-group">
							<textarea  className="form-control"
							placeholder="Digite a consulta SQL" 
							type="text" 
							rows="5" 
							ref="textArea"
							onChange={this.updateQuery}
							value={this.state.query}
							onKeyDown={function(e) {
								var keyCode = e.keyCode || e.which;
								if (keyCode == 9) {
								   e.preventDefault();
								   var that = this.refs.textArea;
								   var s = that.selectionStart;
            					   that.value = that.value.substring(0,that.selectionStart) + "\t" + that.value.substring(that.selectionEnd);
            					   that.selectionEnd = s+1; 
								}
							}.bind(this)}/> 
						</div>
						<div className="checkbox">
						  <label><input type="checkbox" value="" ref="asCsv" /> Resultado em CSV</label>
						</div>
						<div className="form-group col-sm-4 col-sm-offset-4">
							<div
							className="btn btn-block btn-success" 
							onClick={this.executar}>
								Rodar
							</div>
						</div>
					</form>
					{ /* Table div */ }
					<div className="col-sm-12 outer">
						<div className="tabela-div" style={{opacity: this.state.opacity}} ref="tabela">
							<Tabela header={this.state.header} data={this.state.dados} />
						</div>
					</div>
					{/* Error div */}
					<div className="col-sm-12 erro alert alert-danger" style={{opacity: this.state.erroOpacity}} ref="erro">
							{this.state.erro}
					</div>
					{/*<Mapa />*/}
				</div>
			</div>
			);
	}
}