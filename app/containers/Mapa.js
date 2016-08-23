import React, { Component } from 'react';
import { Map } from '../deps/map';
import { View } from '../deps/view';

export class Mapa extends Component {
	render() {
		return (
			<Map view={React.createElement(View, {resolution:10000, center:[0, 0]})}>
			
			</Map>
		);
	}
}
