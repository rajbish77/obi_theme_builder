import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import {
  faCartShopping,
  faSquarePhone,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import {
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons"
// import { Link } from "react-router-dom";
import { Nav, OverlayTrigger } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tooltip from "react-bootstrap/Tooltip"
import Select from "react-select"
import { Link } from "gatsby"
import { makeStyles } from "@mui/material"

interface Country {
  value: string
  label: JSX.Element | string
}

const styleObj = {
  color: "black",
  zIndex: 1021,
  width: "230px",
}

const markets = [
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
]

const FLAG_URL = "https://nigeria.reliablesoftjm.com/images/flags/"

const useStyles:any = makeStyles((theme: { typography: { fontFamily: any }; palette: { header: { backgroundcolor: any; textcolor: any; button: { background: any; color: any; border: any; hoverbackground: any; hovercolor: any } } } }) => ({
  font: {
    fontFamily: theme.typography.fontFamily
  },
  background: {
    backgroundColor: theme.palette.header.backgroundcolor,
  },
  textColor: {
    color: theme.palette.header.textcolor,
  },
  button: {
    backgroundColor: theme.palette.header.button.background,
    color: theme.palette.header.button.color,
    border: `1px solid ${theme.palette.header.button.border}`,
  },
  buttonHover: {
    backgroundColor: `${theme.palette.header.button.hoverbackground} !important`,
    color: `${theme.palette.header.button.hovercolor} !important`,
    border: `1px solid ${theme.palette.header.button.border} !important`,
  },
}
))

const Header = () => {
  const classes = useStyles()
  const tooltip = (
    <Tooltip id="tooltip-cart" className="tooltip" style={{ fontSize: "15px" }}>
      Your cart is empty!
    </Tooltip>
  )

  const renderFontAwesomeCartIcon = () => {
    return (
      <FontAwesomeIcon
        icon={faCartShopping}
        size="2xl"
        className={`${classes.textColor} pe-3`}
        // className="text-light pe-3"
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

  const country_name_with_flag: Country[] = []

  markets.forEach(m => {
    country_name_with_flag.push({
      value: m?.marketid,
      label: (
        <div>
          <img
            src={FLAG_URL + m?.image}
            width="30"
            className="d-inline-block align-left mx-1"
            alt={m?.marketname}
          />{" "}
          {m?.marketname}
        </div>
      ),
    })
  })

  const renderMarketDropDown = () => {
    return (
      <div style={styleObj}>
        <Col md="auto">
          <Select
            // autosize={true}
            defaultValue={country_name_with_flag[0]}
            options={country_name_with_flag}
            onChange={async d => {}}
          />
        </Col>
      </div>
    )
  }
  console.log(classes.textColor)

  return (
    <>
      <Navbar className={classes.background}>
        <div className="container-xxl d-block ">
          <Row className="justify-content-around align-items-center">
            <Col lg={"auto"} md={12}>
              <Row>
                <Col lg={"auto"} md={12} className="m-p-0">
                  <Navbar.Collapse className="d-flex justify-content-center">
                    <Navbar.Text className="d-flex">
                      <div className="d-flex p-1">
                        <FontAwesomeIcon
                          icon={faCloudSun}
                          className={classes.textColor}
                        /> 
                        <span className={`${classes.textColor} ${classes.font}`}>MOBAY: 24 °C</span>
                      </div>
                      <div className="d-flex p-1">
                        <FontAwesomeIcon
                          icon={faCloudSun}
                          className={classes.textColor}
                        />
                        <span className={`${classes.textColor} ${classes.font}`}>
                          KINGSTON: 27 °C
                        </span>
                      </div>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Col>
                <Col lg={"auto"} md={12}>
                  <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text className="d-flex">
                      <a
                        href={"/"}
                        title={"Facebook"}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faFacebookSquare}
                          size={"2xl"}
                          className={classes.textColor}
                          style={{
                            padding: "2px",
                          }}
                        />
                      </a>
                      <a
                        href={"/"}
                        title={"Twitter"}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faTwitterSquare}
                          size={"2xl"}
                          className={classes.textColor}
                          style={{
                            padding: "2px",
                          }}
                        />
                      </a>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Col>

                <Col lg={"auto"} md={12} className="m-p-0">
                  <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text className="d-flex pb-0">
                      <a href={"/"} title={""} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon
                          icon={faSquarePhone}
                          size={"2xl"}
                          className={classes.textColor}
                          style={{
                            padding: "2px",
                          }}
                        />
                      </a>
                      <p className={`${classes.textColor} ${classes.font}`}>
                        &nbsp; Contact Us: USA +1-876-619-1565 | CA 954-837-6290
                      </p>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Col>
              </Row>
            </Col>
            <Col lg={"auto"} md={12}>
              <Row className="align-items-center">
                <Col lg={"auto"} md={12}>
                  <Navbar.Collapse
                    id="basic-navbar-nav"
                    className={"d-flex justify-content-center my-2"}
                  >
                    {renderCartIcon()}
                    <Row className="d-flex mb-2">
                      {/* <Col md="auto" sm="auto" className="pt-2">
                        {t("mybookings:marketLabel")}
                      </Col> */}
                      {renderMarketDropDown()}
                    </Row>
                  </Navbar.Collapse>
                </Col>

                <Col lg={"auto"} md={12} className="m-p-0">
                  <Navbar.Collapse
                    className="justify-content-center"
                    id="basic-navbar-nav"
                  >
                    <Link
                      to="/"
                      className="text-decoration-none"
                    >
                      <Button
                        className={`${classes.button} ${classes.font}`}
                        onMouseEnter={e => {
                          const buttonClasses = (e.target as HTMLButtonElement)
                            ?.classList
                          buttonClasses?.remove(classes.button)
                          buttonClasses?.add(classes.buttonHover)
                        }}
                        onMouseLeave={e => {
                          const buttonClasses = (e.target as HTMLButtonElement)
                            ?.classList
                          buttonClasses?.remove(classes.buttonHover)
                          buttonClasses?.add(classes.button)
                        }}
                      >
                        SUBSCRIBER LOGIN
                      </Button>
                    </Link>
                    <Link to="/" className="mx-1 text-decoration-none">
                      <Button
                        variant="success"
                        className={`${classes.button} ${classes.font}`}
                        onMouseEnter={e => {
                          const buttonClasses = (e.target as HTMLButtonElement)
                            ?.classList
                          buttonClasses?.remove(classes.button)
                          buttonClasses?.add(classes.buttonHover)
                        }}
                        onMouseLeave={e => {
                          const buttonClasses = (e.target as HTMLButtonElement)
                            ?.classList
                          buttonClasses?.remove(classes.buttonHover)
                          buttonClasses?.add(classes.button)
                        }}
                      >
                        PARTNER LOGIN
                      </Button>
                    </Link>
                  </Navbar.Collapse>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Navbar>
    </>
  )
}

export default Header
