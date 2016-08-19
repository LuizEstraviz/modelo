import React, { Component } from 'react';

export class Tabela extends Component {
	constructor(props) {
	    super(props);
  	}

	render() {
		var rows = [];
		this.props.data.map(function(row) {
					var row_group = [];
					row.map(function(record) {
						row_group.push(<td>{record}</td>);
					})
					rows.push(row_group);
			}
    	);
		return (
			<table className="table" width="100%">
			<tbody>
				<tr>
					{
						this.props.header.map(function(head) {
			          		return (<th>{head}</th>);
			        	})
			        }
				</tr>
				{
					rows.map(function(row) {
						return (<tr>{row}</tr>)
					})
				}
			</tbody>
			</table>
		);
	}
}

Tabela.propTypes = {
	header: React.PropTypes.array,
	data: React.PropTypes.array
};

Tabela.defaultProps = { 
	header: [],
	data: [[]] 
};
