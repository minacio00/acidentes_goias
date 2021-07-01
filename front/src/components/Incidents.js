import { map} from 'leaflet';
import React from 'react';
import { useEffect,useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';

export default function Incidents (){
    const [initialState, setInitialState] = useState([]);

    useEffect(()=>{
        fetch('/api/').then(res => {
            if(res.ok){
                return res.json();
            }
        }).then(jsonResponse =>setInitialState(jsonResponse));
    },[]);
  return (
    <MapContainer className="markercluster-map" center={[-16.6799, -49.255]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
        { initialState.map(incident => 
            <Marker
                key ={incident.id}
                position ={[incident.latitude,incident.longitude]}
              />
          

        )}
        </MarkerClusterGroup> 
    </MapContainer>
  )
}