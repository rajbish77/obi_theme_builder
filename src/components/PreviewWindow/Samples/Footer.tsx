import React from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GoogleQR from "../../../images/GoogleQR.jpg";
import gplay from "../../../images/gplay.png";
import itunes from "../../../images/itunes.png";
import AppleQR from "../../../images/AppleQR.jpg";
import {
  faFacebookSquare,
  faPinterestSquare,
  faTwitterSquare,
  faInstagramSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@mui/material";

const useStyles:any = makeStyles((theme: { typography: { fontFamily: any; }; palette: { footer: { backgroundcolor: any; textcolor: { primary: { textcolor: any; }; secondary: { textcolor: any; }; }; }; }; }) => ({
  font: {
    fontFamily: theme.typography.fontFamily
  },
  background: {
    backgroundColor: theme.palette.footer.backgroundcolor,
  },
  primarytextColor: {
    color: theme.palette.footer.textcolor.primary.textcolor,
  },
  secondarytextColor: {
    color: `${theme.palette.footer.textcolor.secondary.textcolor} !important`,
  },
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.background}>
      <Container>
        <Row className="d-flex justify-content-center py-3">
          <Col md={1} className="d-flex justify-content-center px-0"> 
            <a href="/" className={`${classes.primarytextColor} ${classes.font}`}>
              Home
            </a>
          </Col>
          <Col md={1} className="d-flex justify-content-center px-0">
            <a href="https://www.vipattractions.com/page/career" className={`${classes.primarytextColor} ${classes.font}`}>
              Career
            </a>
          </Col>
          <Col md={1} className="d-flex justify-content-center px-0">
            <a href="https://www.vipattractions.com/page/terms" className={`${classes.primarytextColor} ${classes.font}`}>
              Terms of use
            </a>
          </Col>
          <Col md={2} className="d-flex justify-content-center text-center px-0">
            <a href="https://www.vipattractions.com/page/cancellation-policy" className={`${classes.primarytextColor} ${classes.font}`}>
              Cancellation Policy
            </a>
          </Col>
          <Col md={1} className="d-flex justify-content-center px-0">
            <a href="https://www.vipattractions.com/page/privacy" className={`${classes.primarytextColor} ${classes.font}`}>
              Privacy
            </a>
          </Col>
          <Col md={1} className="d-flex justify-content-center px-0">
            <a href="https://www.vipattractions.com/page/contact" className={`${classes.primarytextColor} ${classes.font}`}>
              Contact
            </a>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center py-3">
          <Col md={4} className="">
            <Row>
              <Col className="p-1 d-flex justify-content-center">
                <span className={`${classes.primarytextColor} ${classes.font}`}>
                  Get your lounge booking app
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center ">
                <a href="https://play.google.com/store/apps/details?id=com.reliable.rlbapp">
                  <img
                    src={gplay}
                    width="150"
                    className="d-inline-block p-1 align-center"
                    alt="Google Play"
                  />
                </a>
                <a href="https://apps.apple.com/jp/app/reliable-lounge-bookings/id1352180887?l=en">
                  <img
                    src={itunes}
                    width="150"
                    className="d-inline-block p-1 align-center"
                    alt="App Store"
                  />
                </a>
              </Col>
            </Row>
            <Row>
              <Col className="p-1 d-flex justify-content-center ">
                <img
                  src={GoogleQR}
                  width="150"
                  className="d-inline-block p-1 align-center"
                  alt=""
                />
                <img
                  src={AppleQR}
                  width="150"
                  className="d-inline-block p-1 align-center"
                  alt=""
                />
              </Col>
            </Row>
          </Col>
          <Col md={4} className="">
            <Row>
              <Col className="p-1 d-flex justify-content-center">
                <span className={`${classes.primarytextColor} ${classes.font}`}>
                  Download the app for guide to explore Jamaica
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center px-0">
                <a href="https://play.google.com/store/apps/details?id=co.codecreators.JamaicaExperience">
                  <img
                    src={gplay}
                    width="150"
                    className="d-inline-block p-1 align-center"
                    alt="Google Play"
                  />
                </a>
                <a href="https://apps.apple.com/us/app/jamaica-experiences/id1060263506">
                  <img
                    src={itunes}
                    width="150"
                    className="d-inline-block p-1 align-center"
                    alt="App Store"
                  />
                </a>
              </Col>
            </Row>
            <Row className="">
              <Col className="p-1 d-flex justify-content-center">
                <ul className="list-unstyled d-flex justify-centent-around px-0">
                  <li>
                    <a href={"/"} title={"Facebook"} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faFacebookSquare}
                        size={"2xl"}
                        className={`${classes.primarytextColor} ${classes.font}`}
                        style={{
                          padding: "2px",
                        }}
                      />
                    </a>
                  </li>
                  <li>
                    <a href={"/"} title={"Twitter"} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faTwitterSquare}
                        size={"2xl"}
                        className={`${classes.primarytextColor} ${classes.font}`}
                        style={{   
                          padding: "2px",
                        }}
                      />
                    </a>
                  </li>
                  <li>
                    <a href={"/"} title={"Twitter"} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faPinterestSquare}
                        size={"2xl"}
                        className={`${classes.primarytextColor} ${classes.font}`}
                        style={{ 
                          padding: "2px",
                        }}
                      />
                    </a>
                  </li>
                  <li>
                    <a href={"/"} title={"Instagram"} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faInstagramSquare}
                        size={"2xl"}
                        className={`${classes.primarytextColor} ${classes.font}`}
                        style={{
                          padding: "2px",
                        }}
                      />
                    </a>
                  </li>
                  <li>
                    <a href={"/"} title={"Youtube"} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faYoutubeSquare}
                        size={"2xl"}
                        className={`${classes.primarytextColor} ${classes.font}`}
                        style={{
                          padding: "2px",
                        }}
                      />
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3 d-flex justify-content-center ">
            <span className={`${classes.secondarytextColor} ${classes.font}`}>
              &copy; {new Date().getFullYear()}{" "}
                Club Mobay All rights reserved
            </span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
