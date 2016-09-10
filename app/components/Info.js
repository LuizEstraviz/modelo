import ol from 'openlayers';
import { Overlay, Popover } from 'react-bootstrap';

export class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	addedPopup: null,
			popup: new ol.Overlay({
				  element: this.refs.info,
				  positioning: 'bottom-center',
				  stopEvent: false
				}),
            show: false,
            feature: null,
            position: [0,0]
        };

        this.openPopup = this.openPopup.bind(this);
    }

    openPopup(evt) {
        var feature = this.props.map.forEachFeatureAtPixel(evt.pixel,
              function(feature, layer) {
                return feature;
              });
          if (feature) {
            console.log(feature);
            this.setState({show: true, position: [evt.originalEvent.layerX-15, evt.originalEvent.layerY], feature: feature});
          } else {
            this.setState({show: false});
          }
    }

    componentDidUpdate() {
    	// Add popup
		if (this.props.map && this.state.addedPopup === null) {
			this.props.map.addOverlay(this.state.popup);
			this.setState({addedPopup: true});

            //addListener
            this.props.map.on('click', this.openPopup);
		}


    }

    render() {
        return (
            <div ref="info">
                {this.state.show ? (<Popover id="popover" placement="top" ref="popover" positionLeft={this.state.position[0]} positionTop={this.state.position[1]}>
                    {this.props.fields.map((e, i) => <div key={i}>{e}: {this.props.data[this.state.feature.values_['row']][i]}<br/></div>)}
                </Popover>): null}
            </div>
        )
    }
}