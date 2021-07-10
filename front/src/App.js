import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from "leaflet";
import Incidents from './components/Incidents'


 function App() {
  return (
    <div className="app">
      <Incidents/>
    </div>
  );
}

export default App;
