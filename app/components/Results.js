import { connect } from 'react-redux';
import MapContainer from '../containers/MapContainer.js'
import { Tabela } from '../components/Tabela';
import { transitionEnd, selectTab } from '../redux/actions';
import { Tabs, Tab } from 'react-bootstrap';
import { scripts } from '../sqlscripts/scripts';

class Results extends React.Component {
	constructor(props) {
		super(props);
		this.transEnd = this.transEnd.bind(this);
		this.selectTab = this.selectTab.bind(this);
		this.geoStart = this.geoStart.bind(this);
	}

	geoStart() {
		window.dispatchEvent(new Event('resize'));
		this.props.transitionEnd();
	}

	transEnd() {
		if (this.props.transition)
			this.props.transitionEnd();
	}

	selectTab(e) {
		this.props.selectTab(e);
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
			<Tabs activeKey={this.props.activeTab} id="uncontrolled-tab-example" onSelect={this.props.selectTab}>
			    <Tab eventKey={1} title="Resultados" onEnter={this.transEnd}>
			    	<div className={classNames("col-sm-12 outer results", {"results-show": !this.props.transition})} ref="div" >
						{
							this.props.isError
							? (
								<div className="col-sm-12 results-erro alert alert-danger">
										{this.props.data}
								</div>
							)
							: (
								<div className="tabela-div">
									<Tabela header={this.props.data.fields} data={this.props.data.data} />
								</div>
							)
						}	
			    	</div>
			    </Tab>
			    <Tab eventKey={2} title="Geo" onEnter={this.geoStart}>
			    	<MapContainer />
			    </Tab>
			    <Tab eventKey={3} title="Ajuda">
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
        activeTab: store.activeTab,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    	transitionEnd: () => dispatch(transitionEnd()),
    	selectTab: e => dispatch(selectTab(e)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
