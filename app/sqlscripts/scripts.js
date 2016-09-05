export var scripts = {
	"Consulta árvores": {
		script: [
			"SELECT *", 
			"FROM arvore"
		],
		desc: (
			<div>
				Tabela de árvores limitada em 100 linhas.<br/>
				Exemplo:
				<table className="table">
				    <tbody>
				        <tr>
				            <th>cod_parcela</th>
				            <th>num_medicao</th>
				            <th>num_arvore</th>
				            <th>num_fuste</th>
				            <th>dap</th>
				            <th>alt</th>
				            <th>cod_nota</th>
				        </tr>
				        <tr>
				            <td>P1013201</td>
				            <td>1</td>
				            <td>7</td>
				            <td>7</td>
				            <td>12.4000</td>
				            <td>14.2000</td>
				            <td>H</td>
				        </tr>
				        <tr>
				            <td>P1013201</td>
				            <td>1</td>
				            <td>24</td>
				            <td>26</td>
				            <td>10.5000</td>
				            <td>14.0000</td>
				            <td>N</td>
				        </tr>
				    </tbody>
				</table>
				</div>
			),
	},
	"Consulta limitada": {
		script: [
			"SELECT *",
			"FROM arvore",
			"LIMIT 2",
		],
		desc: (
			<span>Obtém as duas primeiras árvores apenas.</span>
		)
	},
}
