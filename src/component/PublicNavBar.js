import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../component/0.png";
import { Link } from "react-router-dom";

function PublicNavBar() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <img src={logo} alt="CoderSchool" width="50px" />
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Now Playing
          </Nav.Link>
          <Nav.Link as={Link} to="/movies/top_rated">
            Top Rated
          </Nav.Link>
          <Nav.Link as={Link} to="/movies/upcoming">
            Upcoming
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default PublicNavBar;
