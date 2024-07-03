import React, { useState } from "react";
import { Nav, Navbar, NavDropdown, Col, Row, Container } from "react-bootstrap";
import { menuDefault, vipMenus, menuVIPMembershipCard, menuFeedback, menuGetUpdateFlightDetailsLink } from './menuItems';
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

const LOGOS_URL = "https://nigeria.reliablesoftjm.com/images/logos/JAM.png";

const StyledNavbar = styled(Navbar)(({ theme }) => ({
  backgroundColor: theme.palette.navbar.backgroundcolor,
}));

const StyledNav = styled(Nav)(({ theme }) => ({
  color: theme.palette.navbar.textcolor,
  fontFamily: theme.typography.fontFamily,
}));

const StyledNavDropdown = styled(NavDropdown)(({ theme }) => ({
  color: theme.palette.navbar.textcolor,
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.navbar.backgroundcolor,
}));

const StyledNavDropdownItem = styled(NavDropdown.Item)(({ theme }) => ({
  color: theme.palette.navbar.textcolor,
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.navbar.backgroundcolor,
}));

const StyledNavLink = styled(Nav.Link)(({ theme }) => ({
  color: theme.palette.navbar.textcolor,
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.navbar.backgroundcolor,
}));

const TitleSpan = styled('span')(({ theme }) => ({
  color: theme.palette.navbar.textcolor,
}));

const Navigationbar = () => {
  const combinedMenu = [
    ...menuDefault,
    ...vipMenus,
    ...menuVIPMembershipCard,
    ...menuFeedback,
    ...menuGetUpdateFlightDetailsLink
  ];
  const [menuItems] = useState(combinedMenu);

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
                <StyledNav>{renderMenuItems(menuItems)}</StyledNav>
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
        <StyledNavDropdown
          key={i}
          id={item.key}
          renderMenuOnMount={true}
          title={<TitleSpan>{item.title}</TitleSpan>}
        >
          {renderSubMenu(item.submenu)}
        </StyledNavDropdown>
      );
    } else {
      return (
        <StyledNavLink key={i} href={item.url}>
          {item.title}
        </StyledNavLink>
      );
    }
  });
};

const renderSubMenu = (submenu: SubmenuItem[] | undefined) => {
  if (!submenu) return null;
  return submenu.map((item, i) => {
    if (item.submenu) {
      return (
        <StyledNavDropdown
          key={i}
          title={<TitleSpan>{item.title}</TitleSpan>}
          id={item.key}
          renderMenuOnMount={true}
        >
          {renderSubMenu(item.submenu)}
        </StyledNavDropdown>
      );
    } else {
      return (
        <StyledNavDropdownItem
          key={i}
          href={item.url}
          target={item.target}
        >
          {item.title}
        </StyledNavDropdownItem>
      );
    }
  });
};

export default Navigationbar;

declare module '@mui/material/styles' {
  interface Palette {
    navbar: {
      backgroundcolor: string;
      textcolor: string;
    };
  }
  interface PaletteOptions {
    // header: {
    //   backgroundcolor?: string;
    //   textcolor?: string;
    //   button: {
    //     background?: string;
    //     color?: string;
    //     border?: string;
    //     hoverbackground?: string;
    //     hovercolor?: string;
    //   }
    // };
    navbar?: {
      backgroundcolor?: string;
      textcolor?: string;
    };
    body?: {
      backgroundcolor?: string;
      textcolor?: string;
    };
    button?: {
      primary?: {
        background?: string;
        color?: string;
        border?: string;
        boxshadow?: string;
        hoverbackground?: string;
        hovercolor?: string;
        hoverborder?: string;
        boxhovershadow?: string;
      },
      secondary?: {
        background?: string;
        color?: string;
        hoverbackground?: string;
        hovercolor?: string;
      }
    };
    card?: {
      backgroundcolor?: string;
      textcolor?: string;
    };
    subfooter?: {
      backgroundcolor?: string;
      textcolor?: string;
    },
    footer?: {
      backgroundcolor?: string;
      textcolor?: {
        primary?: {
          textcolor?: string;
        },
        secondary?: {
          textcolor?: string;
        }
      },
    }
  }

  interface PaletteOptions {
    palette?: {
      type?: string;
      primary?: {
        main?: string;
      },
      secondary: {
        main: string;
      },
    },
  }
}