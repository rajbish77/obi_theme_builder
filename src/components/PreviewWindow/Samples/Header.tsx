import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  faCartShopping,
  faSquarePhone,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import Tooltip from "react-bootstrap/Tooltip";
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";

declare module '@mui/material/styles' {
  interface Palette {
    header: {
      backgroundcolor: string;
      textcolor: string;
      button: {
        background: string;
        color: string;
        border: string;
        hoverbackground: string;
        hovercolor: string;
      };
    };
  }
  interface PaletteOptions {
    header?: {
      backgroundcolor?: string;
      textcolor?: string;
      button?: {
        background?: string;
        color?: string;
        border?: string;
        hoverbackground?: string;
        hovercolor?: string;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    header: {
      backgroundcolor: '#3f51b5',
      textcolor: '#fff',
      button: {
        background: '#3f51b5',
        color: '#fff',
        border: '#3f51b5',
        hoverbackground: '#303f9f',
        hovercolor: '#fff',
      },
    },
  },
});

interface Country {
  value: string;
  label: JSX.Element | string;
}

const FLAG_URL = "https://nigeria.reliablesoftjm.com/images/flags/";

const StyledNavbar = styled(Navbar)(({ theme }) => ({
  backgroundColor: theme.palette.header?.backgroundcolor || 'inherit',
  color: theme.palette.header?.textcolor || 'inherit',
  fontFamily: theme.typography.fontFamily,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.header?.button?.background || 'inherit',
  color: theme.palette.header?.button?.color || 'inherit',
  border: `1px solid ${theme.palette.header?.button?.border || 'transparent'}`,
  '&:hover': {
    backgroundColor: theme.palette.header?.button?.hoverbackground || 'inherit',
    color: theme.palette.header?.button?.hovercolor || 'inherit',
    border: `1px solid ${theme.palette.header?.button?.border || 'transparent'}`,
  },
}));

const Header = () => {
  const tooltip = (
    <Tooltip id="tooltip-cart" className="tooltip" style={{ fontSize: "15px" }}>
      Your cart is empty!
    </Tooltip>
  );

  const renderFontAwesomeCartIcon = () => (
    <FontAwesomeIcon
      icon={faCartShopping}
      size="2xl"
      className="text-light pe-3"
    />
  );

  const renderCartIcon = () => (
    <div className="cart position-relative">
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        {renderFontAwesomeCartIcon()}
      </OverlayTrigger>
      <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
        0
      </span>
    </div>
  );

  const markets = [
    { marketid: "JAM", marketname: "Jamaica", image: "JAM.png" },
    { marketid: "CYM", marketname: "Cayman", image: "CYM.png" },
    { marketid: "BRB", marketname: "Barbados", image: "BRB.png" },
    { marketid: "BHS", marketname: "Nassau , Bahamas", image: "BHS.png" },
    { marketid: "KNA", marketname: "St. Kitts and Nevis", image: "KNA.png" },
  ];

  const country_name_with_flag: Country[] = markets.map(m => ({
    value: m.marketid,
    label: (
      <div>
        <img
          src={FLAG_URL + m.image}
          width="30"
          className="d-inline-block align-left mx-1"
          alt={m.marketname}
        />
        {m.marketname}
      </div>
    ),
  }));

  return (
    <ThemeProvider theme={theme}>
      <StyledNavbar expand="lg">
        <div className="container-xxl d-block">
          <Row className="justify-content-around align-items-center">
            <Col lg={"auto"} md={12}>
              <Row>
                <Col lg={"auto"} md={12} className="m-p-0">
                  <Navbar.Text className="d-flex justify-content-center">
                    <div className="d-flex p-1">
                      <FontAwesomeIcon
                        icon={faCloudSun}
                        className="pe-2"
                      />
                      <span>MOBAY: 24 °C</span>
                    </div>
                    <div className="d-flex p-1">
                      <FontAwesomeIcon
                        icon={faCloudSun}
                        className="pe-2"
                      />
                      <span>KINGSTON: 27 °C</span>
                    </div>
                  </Navbar.Text>
                </Col>
              </Row>
            </Col>

            <Col lg={"auto"} md={12}>
              <Row className="justify-content-center">
                <Col lg={"auto"} md={12}>
                  <Navbar.Text className="d-flex">
                    <a href="/" title="Facebook" target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faFacebookSquare}
                        size={"2x"}
                        className="me-2"
                      />
                    </a>
                    <a href="/" title="Twitter" target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faTwitterSquare}
                        size={"2x"}
                        className="me-2"
                      />
                    </a>
                  </Navbar.Text>
                </Col>
              </Row>
            </Col>

            <Col lg={"auto"} md={12}>
              <Row className="align-items-center">
                <Col lg={"auto"} md={12}>
                  <Navbar.Text className="d-flex align-items-center">
                    <a href="/" title="" target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faSquarePhone}
                        size={"2x"}
                        className="me-2"
                      />
                    </a>
                    <p className="m-0">
                      Contact Us: USA +1-876-619-1565 | CA 954-837-6290
                    </p>
                  </Navbar.Text>
                </Col>
              </Row>
            </Col>

            <Col lg={"auto"} md={12}>
              <Row className="align-items-center">
                <Col lg={"auto"} md={12}>
                  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center my-2">
                    {renderCartIcon()}
                    <Col md="auto">
                      <Select
                        defaultValue={country_name_with_flag[0]}
                        options={country_name_with_flag}
                        onChange={(d) => { }}
                      />
                    </Col>
                  </Navbar.Collapse>
                </Col>
              </Row>
            </Col>

            <Col lg={"auto"} md={12}>
              <Row className="align-items-center">
                <Col lg={"auto"} md={12}>
                  <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
                    <Link to="/" className="text-decoration-none">
                      <StyledButton>
                        SUBSCRIBER LOGIN
                      </StyledButton>
                    </Link>
                    <Link to="/" className="mx-1 text-decoration-none">
                      <StyledButton variant="success">
                        PARTNER LOGIN
                      </StyledButton>
                    </Link>
                  </Navbar.Collapse>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </StyledNavbar>
    </ThemeProvider>
  );
};

export default Header;
