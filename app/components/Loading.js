import { connect } from 'react-redux';
import { myAction } from '../redux/actions';
import { Modal } from 'react-bootstrap';

var interval = null;

class Loading extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			n: 0
		}
		this.incrementState = this.incrementState.bind(this);
	}

	incrementState() {
		var n = this.state.n;
		n++;
		if (n === 3)
			n = 0;
		this.setState({n: n});
	}

	componentWillUpdate(nextProps, nextState) {
	    if (this.props.loading !== nextProps.loading) {
	    	if (nextProps.loading) {
	    		interval = setInterval(this.incrementState, 300);
	    	}
	    	else {
	    		clearInterval(interval);
	    	}
	    }
	}

	render() {
		return (
			<Modal show={this.props.loading} 
			       onEnter={e => {window.modal=e;e.style.marginTop = ((window.innerHeight - e.children[0].clientHeight)/2 - 50).toString()+'px'}}
			       style={{width: "100%"}}>
		    	<Modal.Body>
		    	Carregando{'.'.repeat(this.state.n)}
		    	</Modal.Body>
	    	</Modal>
		)
	}
}

const mapStateToProps = function(store) {
    return {
        loading: store.loading,
    };
}

export default connect(mapStateToProps)(Loading);
