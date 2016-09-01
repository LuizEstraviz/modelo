import React, { Component } from 'react';
import ExecQueryButton from '../components/ExecQueryButton.js'
import { Tabela } from '../components/Tabela';
import SqlEditor from '../components/SqlEditor';
import { SchemaContainer } from '../containers/SchemaContainer';
import { connect, Provider } from 'react-redux';
import { addUser, setQuery } from '../redux/actions'
import { store } from '../redux/reducers.js'

class Body extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			header: [],
			transicao: false,
			opacity: 0,
			erroOpacity: 0
		};

		this.executaQuery = this.executaQuery.bind(this);
		this.updateQuery = this.updateQuery.bind(this);
		this.transitionStopped = this.transitionStopped.bind(this);
	}

	executaQuery() {
		{
		// If there any error or table is shown hide them and transition
		if (this.state.opacity === 1 || this.state.erroOpacity === 1)
			this.setState({
				transicao: true,
				opacity: 0,
				erroOpacity: 0,
			});

		// If asCsv then open regular as regular link for download
		if (this.refs.asCsv.checked) {
			window.location.replace('http://apoema.esalq.usp.br/~getlidar/query.php?query=' + this.props.query.replace(/\n/g, ' \n') + '&ascsv=true');
			return;
		}
		// Perform get request for query
		axios.get('http://apoema.esalq.usp.br/~getlidar/query.php', {
			params: {
				query: this.props.query,
			},
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
	}

	// function to run when query textarea is updated
	updateQuery(e) {
		this.props.setQuery(e.target.value);
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

	// When transition ends set transicao state to false
	transitionStopped() {
		this.setState({
					transicao: false,
				});
	}


	render() {
		return (
			<div className="jumbotron col-sm-10 text-center contents" style={{marginTop: "-18px"}}>
                <div id="content">
				<div className="col-sm-12 text-center">
					<SchemaContainer />
				{ /* Form input with textarea and a button run sql */ }
					<form>
						<div className="form-group">
							<SqlEditor />
						</div>
						<div className="checkbox">
						  <label><input type="checkbox" value="" ref="asCsv" /> Resultado em CSV</label>
						</div>
						<div className="form-group col-sm-4 col-sm-offset-4">
							<ExecQueryButton />
							<div
							className="btn btn-block btn-success" 
							onClick={this.executaQuery}>
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
					<div className={classNames("col-sm-12 erro alert alert-danger", "tatu")} style={{opacity: this.state.erroOpacity}} ref="erro">
							{this.state.erro}
					</div>
					{/*<Mapa />*/}
				</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = function(store) {
	console.log(store.userState);
  return {
    users: store.userState,
    query: store.query
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    addUser: nome => dispatch(addUser(nome)),
    setQuery: query => dispatch(setQuery(query))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);