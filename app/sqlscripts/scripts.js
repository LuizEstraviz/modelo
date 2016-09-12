export var scripts = {
	"Lista de talhões e fazendas": {
		script: [
			"SELECT *",
			"FROM fazenda"
		],
		desc: (
			<div>
			<p>Mostra a tabela de fazendas no banco de dados.</p>
			<p>Para exibir uma lista de talhões com identificação das respectivas fazendas:.</p>
			<pre>
SELECT<br />
&nbsp;&nbsp;T.id_talhao AS talhao,<br />
&nbsp;&nbsp;F.cod_fazenda AS codigo,<br />
&nbsp;&nbsp;F.id_fazenda AS identificador,<br />
&nbsp;&nbsp;F.dsc_fazenda AS nome<br />
FROM<br />
&nbsp;&nbsp;fazenda F, talhao T<br />
WHERE<br />
&nbsp;&nbsp;F.id_fazenda = T.id_fazenda<br />
ORDER BY 1<br />
			</pre>
			</div>
			),
	},
	"Mapa das fazendas": {
		script: [
			"SELECT *",
			"FROM talhao_geo"
		],
		desc: (
			<div>
			<p>Mostra mapa dos talhoes das duas fazendas.</p>
			<p>Para exibir apenas o mapa da fazenda A:.</p>
			<pre>
			SELECT * <br />FROM talhao_geo <br />WHERE id_fazenda = 1
			</pre>
			<p>Para exibir o mapa de um dos talhões (P.ex.: 101):.</p>
			<pre>
			SELECT * <br />FROM talhao_geo <br />WHERE id_talhao = 101
			</pre>
			<p>Para exibir mapa de um conjunto de talhões (P.ex.: 101, 206 e 401):.</p>
			<pre>
			SELECT * <br />FROM talhao_geo <br />WHERE id_talhao IN (101, 206, 401)
			</pre>
			</div>
			),
	},
	"Talhões por idade": {
		script: [
"SELECT",
"	t.id_talhao AS talhao,",
"	t.area AS area,",
"	r.data_inicio AS data_inicio,",
"	2015 - extract(year from r.data_inicio) AS idade2015,",
"	mg.cod_mat_gen AS clone",
"FROM",
"	rotacao r, talhao t, matgen mg, ciclo c, fazenda f",
"WHERE",
"	f.id_fazenda = t.id_fazenda AND",
"	t.id_talhao = c.id_talhao AND",
"	c.id_talhao = r.id_talhao AND",
"	mg.id_mat_gen = c.id_mat_gen AND",
"	c.ciclo = (	SELECT MAX(cc.ciclo)",
"			FROM rotacao cc",
"			WHERE cc.ciclo = r.ciclo) AND",
"	r.data_inicio = (SELECT MAX(m.data_inicio)",
"				FROM rotacao m",
"				WHERE m.id_talhao = t.id_talhao) AND",
"	t.cod_fazenda = 'A'",
"ORDER BY 4"
		],
		desc: (
			<div>
			<p>Lista de talhões com respectivas idades e clones em 2015.</p>
			<p>O ano de referência, para efeito de cálculo da idade, pode ser alterado na linha 5 da sentença SQL.</p>
			</div>
			)
	}
}