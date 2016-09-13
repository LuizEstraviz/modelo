import React, { Component } from 'react';
import Loading from '../components/Loading.js'
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
			<div className="col-sm-10 body">
			<Loading />
			<div className="jumbotron col-sm-12 text-center body-contents">
                <div id="content">
				<div className="col-sm-12 text-center">
					<div className="col-sm-12">
						<SchemaContainer />
					</div>
				{ /* Form input with textarea and a button run sql */ }
					<div className="col-sm-12">
					<form>
						<div className="form-group">
							<SqlEditor />
							<CSVCheckBox />
							<div className="form-group col-sm-4 col-sm-offset-4">
								<ExecQueryButton />
							</div>
						</div>
					</form>
					</div>
				</div>
				</div>
			</div>
			<Results />
			</div>
		);
	}
}



export default connect(() => Object(), () => Object())(Body);