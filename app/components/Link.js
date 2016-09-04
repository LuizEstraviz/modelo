import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectScript } from '../redux/actions';

class Link extends Component {
	constructor(props) {
		super(props);

		this.setScript = this.setScript.bind(this);
	}

	setScript() {
		this.props.selectScript(this.props.value);
	}

	render() {
		return (
			<a href="#" onClick={this.setScript}>{this.props.children}</a>
		);
	}
}

const mapStateToProps = function(store) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    	selectScript: value => dispatch(selectScript(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Link);

