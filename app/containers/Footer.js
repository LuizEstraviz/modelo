import React, { Component } from 'react';


export class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-sm-12" style={{backgroundColor: "black", position: "fixed", bottom: 0}}>
            	<table className="copyright">
              <tbody>
              <tr>
              		<td>Grupo getLiDAR 2016</td>
              		<td className="right">Produzido por Caio Hamamura</td>
              </tr>
              </tbody>
              </table>
         	</div>
        );
    }
}