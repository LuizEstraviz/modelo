import React, { Component } from 'react';
import { Collapse, Well, Panel } from 'react-bootstrap';

export class CollapsibleImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	render() {
		return (
			<div className="col-sm-12 text-center" style={{marginBottom: 15}}>
						{/* Imagem recolhível */}
						<Collapse in={this.state.open}>
							<Panel className="height200" style={{overflow: "auto", resize: "vertical"}}>
            					<Well>
									<img className="img-reponsive" src={this.props.img} style={{margin: 5, width: "100%"}}/>
								</Well>
							</Panel>
						</Collapse>
					<button type="button" className="btn btn-info" onClick={ () => this.setState({ open: !this.state.open })}>{this.props.text}</button>
			</div>
		);
	}
}
