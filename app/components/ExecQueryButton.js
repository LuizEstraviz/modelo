import { connect } from 'react-redux';
import { myAction } from '../redux/actions';

function executaQuery() {
	alert('asas');
}

const ExecQueryButton = (props) => (
    <div
	    className="btn btn-block btn-success" 
		onClick={executaQuery}>
		Rodar
	</div>
);

const mapStateToProps = function(store) {
    return {
        default: store.state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        action: (value) => dispatch(myAction(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecQueryButton);
