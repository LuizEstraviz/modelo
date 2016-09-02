import React, { Component } from 'react';
import { Col, Nav, Navbar, NavItem, Collapse, Well, Panel } from 'react-bootstrap';
import {Link} from './Link'

export class Header extends Component {
	render() {
		return (
			<div className="col-sm-2" style={{display:"flex"}}>
		    <ul className="nav navbar-nav ">
				<li><Link handleClick={this.props.handleNav1}>Consulta 01</Link></li>
				<li><Link handleClick={this.props.handleNav2}>Consulta 02</Link></li>
				<li><Link handleClick={this.props.handleNav2}>Consulta 03</Link></li>
		   </ul>
	     	</div>
		);
	}
}
