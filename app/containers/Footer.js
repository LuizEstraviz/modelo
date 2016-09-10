export class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
            	<table className="footer-copyright">
              <tbody>
              <tr>
              		<td>GET-LiDAR</td>
              		<td className="footer-right">Produzido por Caio Hamamura (2016)</td>
              </tr>
              </tbody>
              </table>
         	</div>
        );
    }
}