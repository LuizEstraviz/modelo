import { connect } from 'react-redux';
import { Tabela } from '../components/Tabela';
import { transitionEnd } from '../redux/actions';

class Results extends React.Component {
	constructor(props) {
		super(props);
		this.transEnd = this.transEnd.bind(this);
	}

	transEnd() {
		this.props.transitionEnd()
	}

	componentDidMount() {
	    this.refs.div.addEventListener('transitionend', this.transEnd);
	    this.refs.div.addEventListener('webkitTransitionEnd', this.transEnd);
	}

	componentWillUnmount() {
	    this.refs.div.removeEventListener('transitionend', this.transEnd);  
	    this.refs.div.removeEventListener('webkitTransitionEnd', this.transEnd);
	}

	render() {

		return (
			<div className={classNames("col-sm-12 outer results", {show: !this.props.transition})}  ref="div">
				{
					this.props.isError
					? (
						<div className="col-sm-12 erro alert alert-danger">
								{this.props.data}
						</div>
					)
					: (
						<div className="tabela-div">
							<Tabela header={this.props.data.campos} data={this.props.data.dados} />
						</div>
					)
				}	
			</div>
		);
    }
}

const mapStateToProps = function(store) {
    return {
        data: store.data,
        transition: store.transition,
        isError: store.isError,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    	transitionEnd: () => dispatch(transitionEnd()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
