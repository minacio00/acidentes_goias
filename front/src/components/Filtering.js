import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import React from 'react'
import { useEffect,useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

import './Filtering.css'

export default function Filtering (){
  const [cities, setcities] = useState([]);

    useEffect(()=>{
        fetch('/city').then(res => {
            if(res.ok){
                return res.json();
            }
        }).then(jsonResponse =>setcities(jsonResponse));
  },[]);
  console.log(cities);
  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
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
                <Dropdown.Item>{city.municipio}</Dropdown.Item>  
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
  )
}