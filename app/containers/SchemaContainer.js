import React, { Component } from 'react';
import Diagrama from '../img/diagrama.png';
import { CollapsibleImage } from '../components/CollapsibleImage';

export class SchemaContainer extends Component {
	render() {
		return (
			<CollapsibleImage img={Diagrama} text="Mostrar esquema" />	
		);
	}
}
