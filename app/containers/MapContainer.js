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
        this.onFeatureSelect = this.onFeatureSelect.bind(this);
        this.onFeatureUnselect = this.onFeatureUnselect.bind(this);
    }

    onFeatureSelect(feature) {

    }

    onFeatureUnselect(feature) {

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
        if (e.target.getArray().length === 0) {
            alert("no selected feature");
        } else {
            var feature = e.target.item(0);
            alert(this.props.data[feature.get('row')]);
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
            <div id="map" className="map" style={{height:500, width: "100%",}}></div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        geo: store.data.geo,
        data: store.data.data,
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);