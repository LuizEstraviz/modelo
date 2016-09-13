import ol from 'openlayers';
import { Overlay, Popover } from 'react-bootstrap';

export class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	addedPopup: null,
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
            this.state.popup.setPosition(evt.coordinate);
            this.setState({show: true, feature: feature});
          } else {
            this.setState({show: false});
          }
    }

    componentDidUpdate() {
    	// Add popup
        if (this.props.map && this.state.addedPopup === null) {
            this.setState({
                addedPopup: true
            });
			this.props.map.addOverlay(this.state.popup);
			

            //addListener
            this.props.map.on('click', this.openPopup);
		}
    }

    componentDidMount() {
        this.setState({
            popup: new ol.Overlay({
                  element: this.refs.info,
                  positioning: 'bottom-center',
                  stopEvent: false
            })});
    }

    render() {
        return (
            <div ref="info" style={{marginLeft: 125}}>
                {this.state.show ? (<Popover id="popover" placement="bottom" ref="popover">
                    {this.props.fields.map((e, i) => <div key={i}>{e}: {this.props.data[this.state.feature.get('row')][i]}<br/></div>)}
                </Popover>): null}
            </div>
        )
    }
}