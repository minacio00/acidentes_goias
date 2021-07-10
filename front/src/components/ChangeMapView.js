import React from 'react';
import {useMap}from 'react-leaflet';
// import {markerProps} from 'react-leaflet';

//muda a centralização do mapa

function ChangeMapView({coords}) {
    const map = useMap();
    // map.setView(coords, map.getZoom());
    map.setView(coords, 13);
  
    return null;
  }

  export default ChangeMapView;