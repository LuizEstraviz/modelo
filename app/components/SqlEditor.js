import { connect } from 'react-redux';
import { setQuery } from '../redux/actions';
import { scripts } from '../sqlscripts/scripts';
import Codemirror from 'react-codemirror';

require('codemirror/mode/sql/sql');
require('codemirror/addon/hint/sql-hint.js');



class SqlEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    	var editor = this.refs['CodeMirror'].getCodeMirrorInstance();
    	let showHint = require('codemirror/addon/hint/show-hint');
    	showHint(editor, { 
        tables: {
            "table1": [ "col_A", "col_B", "col_C" ],
            "table2": [ "other_columns1", "other_columns2" ]
        }
    } );
    }

    render() {
    	return (
    		<div className="col-sm-12">
    		{/*
		    	<textarea ref="code" className="form-control"
									placeholder="Digite a consulta SQL" 
									type="text" 
									rows="5" 
									onChange={e => this.props.setQuery(e.target.value)}
									value={this.props.query}
									onKeyDown={function(e) {
										var keyCode = e.keyCode || e.which;
										if (keyCode == 9) {
										   e.preventDefault();
										   var that = e.target;
										   var s = that.selectionStart;
		            					   that.value = that.value.substring(0,that.selectionStart) + "\t" + that.value.substring(that.selectionEnd);
		            					   that.selectionEnd = s+1; 
										}
									}.bind(this)} /> 
    		
    		*/}
    			<Codemirror  ref="CodeMirror" value={this.props.query} onChange={this.props.setQuery} options={{
    			    mode: 'text/x-pgsql',
    			    lineNumbers: true,
    			    extraKeys: {
    			    	'Ctrl-Space': "autocomplete"
    			    },
    			}} />
								
		    </div>
	    );
    }
}




const mapStateToProps = function(store) {
    return {
        query: store.query,
        selScript: store.selScript
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setQuery: query => dispatch(setQuery(query))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SqlEditor);
