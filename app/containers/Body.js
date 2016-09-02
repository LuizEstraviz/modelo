import React, { Component } from 'react';
import CSVCheckBox from '../components/CSVCheckBox';
import Results from '../components/Results.js'
import ExecQueryButton from '../components/ExecQueryButton.js'
import { Tabela } from '../components/Tabela';
import SqlEditor from '../components/SqlEditor';
import { SchemaContainer } from '../containers/SchemaContainer';
import { connect, Provider } from 'react-redux';
import { asCsvChanged, setQuery } from '../redux/actions'
import { store } from '../redux/reducers.js'

class Body extends Component {
	constructor(props) {
		super(props);

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
						<CSVCheckBox />
						<div className="form-group col-sm-4 col-sm-offset-4">
							<ExecQueryButton />
						</div>
					</form>
					<Results />
				</div>
				</div>
			</div>
		);
	}
}



export default connect(() => Object(), () => Object())(Body);