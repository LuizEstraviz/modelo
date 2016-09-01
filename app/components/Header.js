import React, { Component } from 'react';
import { Col, Nav, Navbar, NavItem, Collapse, Well, Panel } from 'react-bootstrap';
import {Link} from './Link'

export class Header extends Component {
	render() {
		return (
			<div className="col-sm-2" style={{display:"flex"}}>
		    <ul className="nav navbar-nav ">
				<li><Link handleClick={this.props.handleNav1}>NavItem 1 content</Link></li>
				<li><Link handleClick={this.props.handleNav2}>NavItem 2 content</Link></li>
		   </ul>
	     	</div>
		);
	}
}
