import { connect } from 'react-redux';
import { setQuery, fetchQuery } from '../redux/actions';
import { scripts } from '../sqlscripts/scripts';
import Codemirror from 'react-codemirror';
import CodeMirror from 'codemirror';

require('codemirror/mode/sql/sql');
require('codemirror/addon/hint/sql-hint.js');
require('codemirror/addon/hint/show-hint');


class SqlEditor extends React.Component {
    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
    }

    change(e) {
        this.props.setQuery(e);
    }

    componentDidMount() {
        var editor = this.refs['CodeMirror'].getCodeMirrorInstance();
        var editor2 = this.refs['CodeMirror'].getCodeMirror();
        editor2.on("keyup", function (cm, event) {
        if (!cm.state.completionActive && /*Enables keyboard navigation in autocomplete list*/
            (event.keyCode > 47 && event.keyCode <= 90) 
            || event.keyCode === 190 
            || event.keyCode === 32) {        /*Enter - do not open autocomplete list just after item has been selected in it*/ 
            editor.commands.autocomplete(cm, null, {completeSingle: false});
        }
        if (event.keyCode === 13 && event.ctrlKey)
            this.props.fetchQuery();
    }.bind(this));
        axios.get(servUrl + 'tables.php').then((response) => {
            CodeMirror.commands.autocomplete = function(cm) {
                CodeMirror.showHint(cm, CodeMirror.hint.sql, { 
                    tables: response.data
                });
            }
        });
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
    			<Codemirror  ref="CodeMirror" value={this.props.query} onChange={this.change} options={{
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
        setQuery: query => dispatch(setQuery(query)),
        fetchQuery: () => {dispatch(fetchQuery())},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SqlEditor);
