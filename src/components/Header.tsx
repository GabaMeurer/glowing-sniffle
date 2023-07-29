import React from "react";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import { BsBell, BsGear } from "react-icons/bs";


interface HeaderProps {
  handleNavigation: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ handleNavigation }) => {
  return (
    <Navbar expand="lg" className="custom-navbar d-flex justify-content-between px-3">
      <Navbar.Brand href="#" onClick={() => handleNavigation("/")}>Home</Navbar.Brand>
      <Nav className="align-items-center">
        <Nav.Item className="mx-2">
          <Button variant="outline-light">
            <BsBell />
          </Button>
        </Nav.Item>
        <Nav.Item className="mx-2">
          <Button variant="outline-light">
            <BsGear />
          </Button>
        </Nav.Item>
        <Nav.Item className="ml-2">
          <Image src="profile-picture-url" roundedCircle />
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;



