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

interface Country {
  value: string
  label: JSX.Element | string
}

const FLAG_URL = "https://nigeriadev.reliablesoftjm.com/images/flags/"

const StyledNavbar = styled(Navbar)(({ theme }) => ({
  backgroundColor: theme.palette.header.backgroundcolor,
}))

const StyledTypography = styled("p")(({ theme }) => ({
  color: theme.palette.header.textcolor,
  fontFamily: theme.typography.fontFamily,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.header.button.background,
  color: theme.palette.header.button.color,
  border: `1px solid ${theme.palette.header.button.border}`,
  '&:hover': {
    backgroundColor: theme.palette.header.button.hoverbackground,
    color: theme.palette.header.button.hovercolor,
  },
}))

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)(({ theme }) => ({
  color: theme.palette.header.textcolor,
}))

const countryOptions = [
  {
    marketid: "JAM",
    marketname: "Jamaica",
    image: "JAM.png",
  },
  {
    marketid: "CYM",
    marketname: "Cayman",
    image: "CYM.png",
  },
  {
    marketid: "BRB",
    marketname: "Barbados",
    image: "BRB.png",
  },
  {
    marketid: "BHS",
    marketname: "Nassau , Bahamas",
    image: "BHS.png",
  },
  {
    marketid: "KNA",
    marketname: "St. Kitts and Nevis",
    image: "KNA.png",
  },
].map((market) => ({
  value: market.marketid,
  label: (
    <div>
      <img
        src={FLAG_URL + market.image}
        width="30"
        className="d-inline-block align-left mx-1"
        alt={market.marketname}
      />{" "}
      {market.marketname}
    </div>
  ),
}))

const Header = () => {
  const tooltip = (
    <Tooltip id="tooltip-cart" className="tooltip" style={{ fontSize: "15px" }}>
      Your cart is empty!
    </Tooltip>
  )

  const renderFontAwesomeCartIcon = () => {
    return (
      <StyledFontAwesomeIcon
        icon={faCartShopping}
        size="2xl"
        className="pe-3"
      />
    )
  }

  const renderCartIcon = () => {
    return (
      <div className="cart position-relative">
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          {renderFontAwesomeCartIcon()}
        </OverlayTrigger>

        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
          0
        </span>
      </div>
    )
  }

  return (
    <>
      <StyledNavbar>
        <div className="container-xxl d-block">
          <Row className="justify-content-around align-items-center">
            <Col lg={"auto"} md={12}>
              <Row>
                <Col lg={"auto"} md={12} className="m-p-0">
                  <Navbar.Collapse className="d-flex justify-content-center">
                    <Navbar.Text className="d-flex">
                      <div className="d-flex p-1">
                        <StyledFontAwesomeIcon icon={faCloudSun} />
                        <StyledTypography>MOBAY: 24 °C</StyledTypography>
                      </div>
                      <div className="d-flex p-1">
                        <StyledFontAwesomeIcon icon={faCloudSun} />
                        <StyledTypography>KINGSTON: 27 °C</StyledTypography>
                      </div>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Col>
                <Col lg={"auto"} md={12}>
                  <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text className="d-flex">
                      <a href={"/"} title={"Facebook"} target="_blank" rel="noreferrer">
                        <StyledFontAwesomeIcon icon={faFacebookSquare} size={"2xl"} style={{ padding: "2px" }} />
                      </a>
                      <a href={"/"} title={"Twitter"} target="_blank" rel="noreferrer">
                        <StyledFontAwesomeIcon icon={faTwitterSquare} size={"2xl"} style={{ padding: "2px" }} />
                      </a>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Col>

                <Col lg={"auto"} md={12} className="m-p-0">
                  <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text className="d-flex pb-0">
                      <a href={"/"} title={""} target="_blank" rel="noreferrer">
                        <StyledFontAwesomeIcon icon={faSquarePhone} size={"2xl"} style={{ padding: "2px" }} />
                      </a>
                      <StyledTypography>&nbsp; Contact Us: USA +1-876-619-1565 | CA 954-837-6290</StyledTypography>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Col>
              </Row>
            </Col>
            <Col lg={"auto"} md={12}>
              <Row className="align-items-center">
                <Col lg={"auto"} md={12}>
                  <Navbar.Collapse id="basic-navbar-nav" className={"d-flex justify-content-center my-2"}>
                    {renderCartIcon()}
                    <Row className="d-flex mb-2">
                      <div style={{ color: "black", zIndex: 1021, width: "230px" }}>
                        <Col md="auto">
                          <Select
                            defaultValue={countryOptions[0]}
                            options={countryOptions}
                            onChange={async d => {}}
                          />
                        </Col>
                      </div>
                    </Row>
                  </Navbar.Collapse>
                </Col>

                <Col lg={"auto"} md={12} className="m-p-0">
                  <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
                    <div className="text-decoration-none">
                      <StyledButton>
                        SUBSCRIBER LOGIN
                      </StyledButton>
                    </div>
                    <div className="mx-1 text-decoration-none">
                      <StyledButton variant="success">
                        PARTNER LOGIN
                      </StyledButton>
                    </div>
                  </Navbar.Collapse>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </StyledNavbar>
    </>
  )
}

export default Header
