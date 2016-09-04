import { connect } from 'react-redux';
import { Tabela } from '../components/Tabela';
import { transitionEnd } from '../redux/actions';
import { Tabs, Tab } from 'react-bootstrap';
import { scripts } from '../sqlscripts/scripts';

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
			<div className="col-sm-12">
			<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
			    <Tab eventKey={1} title="Resultados">
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
			    </Tab>
			    <Tab eventKey={2} title="Ajuda">
			    	<div className="text-left">
			    		{this.props.selScript !== '' ? scripts[this.props.selScript].desc : ''}
			    	</div>
			    </Tab>
			  </Tabs>
			</div>
		);
    }
}

const mapStateToProps = function(store) {
    return {
        data: store.data,
        transition: store.transition,
        isError: store.isError,
        selScript: store.selScript,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    	transitionEnd: () => dispatch(transitionEnd()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
