import React, { Component } from 'react';
import { connect } from 'react-redux';
import ol from 'openlayers'

var vecSource = new ol.source.Vector({}); 

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          map: null
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
            target: 'map',
            view: new ol.View({
              projection: 'EPSG:3857',
              center: [0, 0],
              zoom: 1
            })
          }); 
        this.setState({
          map: map
        });
        map.on('change:size', function(){
          if (this.props.geo && this.props.geo.features.length > 0)
            map.getView().fit(vecSource.getExtent(), map.getSize());
        }.bind(this));
        window.map = map;
    }

    componentDidUpdate(prevProps, prevState) {

      vecSource.clear();
      this.state.map.getView().setZoom(1);
      this.state.map.getView().setCenter([0,0]);
      if (this.props.geo && this.props.geo.features.length > 0) {
        vecSource.addFeatures((new ol.format.GeoJSON()).readFeatures(this.props.geo));
        this.state.map.getLayers().getArray()[1].setSource(vecSource);
        map.getView().fit(vecSource.getExtent(), map.getSize());
      }    
    }

    render() {      
        return (
            <div id="map" className="map" style={{height:500, width: "100%",}}></div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        geo: store.data.geo,
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);