import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Row, Container } from "react-bootstrap";
import {
  menuDefault,
  vipMenus,
  menuVIPMembershipCard,
  menuFeedback,
  menuGetUpdateFlightDetailsLink,
} from "./menuItems";
import { styled } from "@mui/material/styles";

interface MenuItem {
  key: string;
  title: string;
  submenu?: MenuItem[];
  url?: string;
}

interface SubmenuItem {
  key: string;
  title: string;
  submenu?: SubmenuItem[];
  url?: string;
  target?: string;
}

const StyledNavbar = styled(Navbar)(({ theme }) => ({
  backgroundColor: theme.palette.navbar?.backgroundcolor,
}));

const StyledNav = styled(Nav)(({ theme }) => ({
  color: theme.palette.navbar?.textcolor,
}));

const Navigationbar = () => {
  const combinedMenu = [
    ...menuDefault,
    ...vipMenus,
    ...menuVIPMembershipCard,
    ...menuFeedback,
    ...menuGetUpdateFlightDetailsLink,
  ];
  const [menuItems, setMenuItems] = useState<MenuItem[]>(combinedMenu);
  const LOGOS_URL = "https://nigeria.reliablesoftjm.com/images/logos/JAM.png";

  return (
    <>
      <StyledNavbar expand="lg" sticky="top">
        <Container fluid="xxl">
          <Row className="d-flex justify-content-start align-items-center">
            <Col md={"auto"} className="d-flex pe-0">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Brand href={"/"} className="ps-1 me-0 ps-md-0">
                <img
                  src={LOGOS_URL}
                  width={200}
                  className="d-inline-block align-left"
                  alt={"Jamaica"}
                />
              </Navbar.Brand>
            </Col>
            <Col md={"auto"} className="d-flex justify-content-between">
              <Navbar.Collapse id="basic-navbar-nav">
                <StyledNav className="nav-link">
                  {renderMenuItems(menuItems)}
                </StyledNav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </StyledNavbar>
    </>
  );
};

const renderMenuItems = (menuItems: MenuItem[]) => {
  return menuItems.map((item, i) => {
    if (item.submenu) {
      return (
        <NavDropdown
          key={i}
          title={<span>{item.title}</span>}
          id={item.key}
          renderMenuOnMount={true}
          className="nav-link"
        >
          {renderSubMenu(item.submenu)}
        </NavDropdown>
      );
    } else {
      return (
        <Nav.Link
          key={i}
          href={item.url}
          className="nav-link"
        >
          {item.title}
        </Nav.Link>
      );
    }
  });
};

const renderSubMenu = (submenu: SubmenuItem[] | undefined) => {
  if (!submenu) return null;
  return submenu.map((item, i) => {
    if (item.submenu) {
      return (
        <NavDropdown
          key={i}
          title={<span>{item.title}</span>}
          id={item.key}
          renderMenuOnMount={true}
          className="nav-link"
        >
          {renderSubMenu(item.submenu)}
        </NavDropdown>
      );
    } else {
      return (
        <NavDropdown.Item
          key={i}
          href={item.url}
          className="nav-link"
          target={item.target}
        >
          {item.title}
        </NavDropdown.Item>
      );
    }
  });
};

export default Navigationbar;
