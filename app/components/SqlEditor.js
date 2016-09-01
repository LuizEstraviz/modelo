import { connect } from 'react-redux';
import { setQuery } from '../redux/actions';

const SqlEditor = (props) => (
    <div>
    	<textarea  className="form-control"
							placeholder="Digite a consulta SQL" 
							type="text" 
							rows="5" 
							onChange={e => props.setQuery(e.target.value)}
							value={props.query}
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
    </div>
);

const mapStateToProps = function(store) {
    return {
        query: store.query,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setQuery: query => dispatch(setQuery(query))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SqlEditor);
