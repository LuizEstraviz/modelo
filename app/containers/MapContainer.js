import ol from 'openlayers';
import Info from '../components/Info.js'
import { connect } from 'react-redux';

var vecSource = new ol.source.Vector({}); 

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          map: null,
        };
    }

    componentDidMount() {
        var map = new ol.Map({
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              }),
              new ol.layer.Vector(vecSource),
            ],
            target: this.refs.map,
            view: new ol.View({
              projection: 'EPSG:3857',
              center: [0, 0],
              zoom: 1
            })
          }); 
        this.setState({
          map: map
        });

        // set current view to data when entering Geo tab 
        map.on('change:size', function(){
          if (this.props.geo && this.props.geo.features.length > 0) {
            map.getView().fit(vecSource.getExtent(), map.getSize());
          }
        }.bind(this));

        var select = new ol.interaction.Select();
        map.addInteraction(select);
        window.select = select;
        select.getFeatures().on('change:length', function(e) {
        if (e.target.getArray().length > 0) {
            var feature = e.target.item(0);
        }
    }.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {

      vecSource.clear();
      var view = this.state.map.getView();
      view.setZoom(1);
      view.setCenter([0,0]);
      if (this.props.geo && this.props.geo.features.length > 0) {
        vecSource.addFeatures((new ol.format.GeoJSON()).readFeatures(this.props.geo));
        this.state.map.getLayers().getArray()[1].setSource(vecSource);
        view.fit(vecSource.getExtent(), this.state.map.getSize());
      }    
    }

    render() {      
        return (
            <div id="map" className="map" style={{height:500, width: "100%",}} ref="map">
              <Info map={this.state.map}/>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        geo: store.data.geo,
        data: store.data.data,
        fields: store.data.fields,
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);