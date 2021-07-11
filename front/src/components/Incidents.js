import { map} from 'leaflet';
import React from 'react';
import { useEffect,useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import './Filtering.css'
import ChangeMapView from './ChangeMapView';

// import api from '../services/api';


export default function Incidents (){
  let count = 0;
  const [initialState, setInitialState] = useState([]);
        // api.get('api/').then(response =>
        // setInitialState(response.data)); // muito lento 
  useEffect(()=>{
    fetch('/api/').then(res => {
      if(res.ok){
       return res.json();
      }
    }).then(jsonResponse =>setInitialState(jsonResponse));
  },[]);

  const [cities, setcities] = useState([]);
    useEffect(()=>{
      fetch('/city').then(res => {
        if(res.ok){
          return res.json();
        }
      }).then(jsonResponse =>setcities(jsonResponse));
    },[]);

  const [mapCenter,setMapCenter] = useState([-16.6799, -49.255]);
  // console.log(mapCenter);

  function FilterByCity(municipio) {
    fetch(`/filterByCity/${municipio}`).then(res => {
          if(res.ok){
            return res.json();
          }
        }).then(jsonResponse =>{
          setMapCenter([jsonResponse[0].latitude,jsonResponse[0].longitude]);
          setInitialState(jsonResponse)});
  }

  

  return (
    <div id='incidents'>
      <div id='filtering-nav'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              {/* <NavDropdown title="Municipios" id="collasible-nav-dropdown">  */}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Municipios
                </Dropdown.Toggle>

                {/* <Dropdown.Menu  style={{overflowY: 'scroll', maxHeight: (window.innerHeight)}}> */}
                <Dropdown.Menu> 
                  {cities.map(city =>
                    <Dropdown.Item onClick={()=>
                      FilterByCity(city.municipio)
                    }>
                      {city.municipio}
                    </Dropdown.Item>  
                  )}
                </Dropdown.Menu>
              </Dropdown>
                  {/* <NavDropdown.Divider /> */}

            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className = 'map'>
        <MapContainer className="markercluster-map" center={mapCenter} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup key = {mapCenter}>
            { initialState.map(incident => 
              <>
                <Marker
                    key ={incident.id}//count++}
                    marker_index={[incident.latitude,incident.longitude]}
                    position ={[incident.latitude,incident.longitude]}
                >
                  <Popup>
                    latitude: {incident.latitude} <br/>
                    longitude: {incident.longitude} <br/>
                    municipio: {incident.municipio} <br/>
                    regional: {incident.regional}
                  </Popup>
                </Marker>
              </>

            )}
            </MarkerClusterGroup>
            <ChangeMapView coords = {mapCenter}/>
        </MapContainer>
      </div>
    </div>
  )
}