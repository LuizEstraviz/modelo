import React, { Component } from 'react';
import Diagrama from '../img/diagrama.png';

export class Imagem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<img className="img-reponsive" src={this.props.src} style={{margin: 5, width: "100%"}}/>
		);
	}
}

Imagem.propTypes = {
	src: React.PropTypes.string,
};


Imagem.defaultProps = { 
	src: Diagrama,
};
