import React from "react"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Row, Container } from "react-bootstrap";
import { menuDefault, vipMenus, menuVIPMembershipCard, menuFeedback, menuGetUpdateFlightDetailsLink } from './menuItems';
import { useState } from "react";
import { makeStyles } from "@mui/material";

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

const useStyles:any = makeStyles((theme: { typography: { fontFamily: any; }; palette: { navbar: { backgroundcolor: any; textcolor: any; }; }; }) => ({
  font: {
    fontFamily: theme.typography.fontFamily
  },
  background: {
    backgroundColor: theme.palette.navbar.backgroundcolor,
  },
  textColor: {
    color: `${theme.palette.navbar.textcolor} !important`,
  },
}))

const Navigationbar = () => {
    const classes = useStyles()

    const combinedMenu = [
      ...menuDefault,
      ...vipMenus,
      ...menuVIPMembershipCard,
      ...menuFeedback,
      ...menuGetUpdateFlightDetailsLink
    ];
    const [menuItems, setMenuItems] = useState(combinedMenu);
    const LOGOS_URL = "https://nigeria.reliablesoftjm.com/images/logos/JAM.png"
  return (
    <>
      <Navbar
        className={classes.background}
        expand="lg"
        sticky="top"
      >
        <Container fluid="xxl" className="">
          <Row className="d-flex  justify-content-start align-items-center">
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
                <Nav className={`${classes.textColor} ${classes.font}`}>{renderMenuItems(menuItems, classes)}</Nav>
              </Navbar.Collapse>
            </Col>
            </Row>
          
        </Container>
      </Navbar>
    </>
  );
};

const renderMenuItems = (menuItems:  MenuItem[], classes : any) => {
  return menuItems.map((item, i) => {
    if (item.submenu) {
      return (
        <NavDropdown
          key={i}
          // title={item.title}
          id={item.key}
          renderMenuOnMount={true}
          className={`${classes.textColor} ${classes.font} ${classes.background}`}
          title={<span className={classes.textColor}>{item.title}</span>}
        >
          {renderSubMenu(item.submenu, classes)}
        </NavDropdown>
      );
    } else {
      return (
        <Nav.Link key={i} href={item.url} className={`${classes.background} ${classes.textColor} ${classes.font}`}>
          {item.title}
        </Nav.Link>
      );
    }
  });
};

const renderSubMenu = (submenu: SubmenuItem[] | undefined, classes: any) => {
  if (!submenu) return null;
  return submenu.map((item, i) => {
    if (item.submenu) {
      return (
        <NavDropdown
          key={i}
          title={<span className={classes.textColor}>{item.title}</span>}
          id={item.key}
          renderMenuOnMount={true}
          className={`${classes.background} ${classes.textColor} ${classes.font}`}
        >
          {renderSubMenu(item.submenu,classes)}
        </NavDropdown>
      );
    } else {
      return (
        <NavDropdown.Item
          key={i}
          href={item.url}
          className={`${classes.background} ${classes.textColor} ${classes.font} ${item.submenu ? "" : "nav-link"}`}
          target={item.target}
        >
          {item.title}
        </NavDropdown.Item>
      );
    }
  });
};

export default Navigationbar;