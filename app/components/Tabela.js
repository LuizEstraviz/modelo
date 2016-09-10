export class Tabela extends React.Component {
	constructor(props) {
	    super(props);
  	}

	render() {
		var rows = [];
		this.props.data.map(function(row) {
					var row_group = [];
					row.map(function(record, i) {
						row_group.push(<td key={i}>{record}</td>);
					})
					rows.push(row_group);
			}
    	);
		return (
			<table className="table-striped" width="100%">
			<tbody>
				<tr>
					{
						this.props.header.map(function(head, i) {
			          		return (<th key={i}>{head}</th>);
			        	})
			        }
				</tr>
				{
					rows.map(function(row, i) {
						return (<tr key={i}>{row}</tr>)
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
