import React, { Component } from 'react';

export class Link extends Component {
	render() {
		return (
			<a href="#" onClick={this.props.handleClick}>{this.props.children}</a>
		);
	}
}
