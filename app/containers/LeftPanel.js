import React, { Component } from 'react';
import { Col, Nav, Navbar, NavItem, Collapse, Well, Panel } from 'react-bootstrap';
import Link from '../components/Link'
import { scripts } from '../sqlscripts/scripts';

function clica() {
	alert('a');
}

export class LeftPanel extends Component {

	render() {
		return (
			<div className="col-sm-2" style={{display:"flex"}}>
		    <ul className="nav navbar-nav">
		    	{Object.keys(scripts).map( (x, i) => <li key={i}><Link value={x}>{x}</Link></li> )}
		   </ul>
	     	</div>
		);
	}
}
