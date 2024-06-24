import { Link } from "gatsby";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ArrivalProductImg from "../../../images/pic2_resized.jpg";
import DepartureProductImg from "../../../images/pic3_resized.jpg";
import BundleProductImg from "../../../images/pic1_resized.jpg";
import giftCard1 from "../../../images/gift-card-1.png";
import giftCard2 from "../../../images/gift-card-2.png";
import visamaster from "../../../images/visa-master-card.png";
import { makeStyles } from "@mui/material";

const useStyles:any = makeStyles((theme: { typography: { fontFamily: any; }; palette: { subfooter: { backgroundcolor: any; textcolor: any; }; body: { backgroundcolor: any; textcolor: any; }; button: { primary: { background: any; color: any; border: any; boxshadow: any; hoverbackground: any; hovercolor: any; boxhovershadow: any; }; }; }; }) => ({
  font: {
    fontFamily: theme.typography.fontFamily
  },
  subfooterbackground: {
    backgroundColor: theme.palette.subfooter.backgroundcolor,
  },
  background: {
    backgroundColor: theme.palette.body.backgroundcolor,
  },
  subfootertextColor: {
    color: theme.palette.subfooter.textcolor,
    textAlign: "center"
  },
  bodytextColor: {
    color: theme.palette.body.textcolor,
  },
  cardbackground: {
    backgroundColor: theme.palette.body.backgroundcolor,
  },
  cardtextColor: {
    color: theme.palette.body.textcolor,
  },
  primarybutton: {
    backgroundColor: `${theme.palette.button.primary.background} !important`,
    color: `${theme.palette.button.primary.color} !important`,
    border: `1px solid ${theme.palette.button.primary.border} !important`,
    boxShadow: `0 3px 1px -2px ${theme.palette.button.primary.boxshadow}, 0 2px 2px 0 ${theme.palette.button.primary.boxshadow}, 0 1px 5px 0 ${theme.palette.button.primary.boxshadow} !important`
  },
  primarybuttonHover: {
    backgroundColor: `${theme.palette.button.primary.hoverbackground} !important`,
    color: `${theme.palette.button.primary.hovercolor} !important`,
    border: `1px solid ${theme.palette.button.primary.border} !important`,
    boxShadow: `2px 2px 4px 1px ${theme.palette.button.primary.boxhovershadow}, 2px 2px 4px 1px ${theme.palette.button.primary.boxhovershadow}, 2px 2px 4px 1px ${theme.palette.button.primary.boxhovershadow}, 2px 2px 4px 1px ${theme.palette.button.primary.boxhovershadow} !important`
  },

}))

function Home() {   
  const classes = useStyles();
  return (
    <>
      <div className={classes.background}>
        <section >
          <Container className="py-4">
            <h3 className="mb-3 d-flex justify-content-center">
              <span className={`${classes.bodytextColor} ${classes.font} heading`}>LOUNGE SERVICES</span>
            </h3>
            <h4 className={`${classes.bodytextColor} ${classes.font} my-3 d-flex justify-content-center`}>
              Please select your product
            </h4>
          </Container>
        </section>
        
        <section>
          <Container className="my-4">
            <Row className="d-flex justify-content-center">
              <Col className="col-md-4 d-flex" >
                <Card className={`${classes.cardbackground} ${classes.font}`}>
                  <Button
                    type="submit"
                    className={`${classes.primarybutton} ${classes.font} my-2 mx-2`}
                    // size="md"
                    onMouseEnter={e => {
                      const buttonClasses = (e.target as HTMLButtonElement)
                        ?.classList
                      buttonClasses?.remove(classes.primarybutton)
                      buttonClasses?.add(classes.primarybuttonHover)
                    }}
                    onMouseLeave={e => {
                      const buttonClasses = (e.target as HTMLButtonElement)
                        ?.classList
                      buttonClasses?.remove(classes.primarybuttonHover)
                      buttonClasses?.add(classes.primarybutton)
                    }}
                  >
                    BOOK ARRIVAL & DEPARTURE
                  </Button>

                  <Card.Img
                    className="img-responsive bottom-block"
                    variant="middle"
                    alt={"Image"}
                    src={BundleProductImg}
                  />
                  <Card.Body className={`${classes.cardtextColor} ${classes.font}`}>
                    <Card.Text className="mb-0">
                      Enjoy your first and last impression of the beautiful island with Jamaicas Personalized and Expedited Airport Concierge Lounge Services where you RELAX. CONNECT and DISCOVER our gateway to paradise.
                    </Card.Text>
                  </Card.Body>

                  <Link
                    to="/"
                    className="btn p-0 no-btn-border"
                  // onClick={showPriceModal}
                  >
                    <Card.Footer className={`${classes.cardtextColor} ${classes.font} align-items-center text-center p-3`}>
                      View Price
                    </Card.Footer>
                  </Link>
                </Card>
              </Col>
              <Col className="col-md-4 d-flex" >
                <Card className={`${classes.cardbackground}`}>
                  <Button
                    type="submit"
                    className={`${classes.primarybutton} ${classes.font} my-2 mx-2`}
                  // size="md"
                    onMouseEnter={e => {
                      const buttonClasses = (e.target as HTMLButtonElement)
                        ?.classList
                      buttonClasses?.remove(classes.primarybutton)
                      buttonClasses?.add(classes.primarybuttonHover)
                    }}
                    onMouseLeave={e => {
                      const buttonClasses = (e.target as HTMLButtonElement)
                        ?.classList
                      buttonClasses?.remove(classes.primarybuttonHover)
                      buttonClasses?.add(classes.primarybutton)
                    }}
                  >
                    BOOK ARRIVAL
                  </Button>

                  <Card.Img
                    className="img-responsive bottom-block"
                    variant="middle"
                    alt={"Image"}
                    src={ArrivalProductImg}
                  />
                  <Card.Body className={`${classes.cardtextColor} ${classes.font}`}>
                    <Card.Text className="mb-0">
                      Maximize your time in paradise; enjoy personalized escort services with preferential fast track through immigration and customs whilst you access Jamaicas premier arrival lounge where culture meets comfort.
                    </Card.Text>
                  </Card.Body>

                  <Link
                    to="/"
                    className="btn p-0 no-btn-border"
                  // onClick={showPriceModal}
                  >
                    <Card.Footer className={`${classes.cardtextColor} ${classes.font} align-items-center text-center p-3`}>
                      View Price
                    </Card.Footer>
                  </Link>
                </Card>
              </Col>
              <Col className="col-md-4 d-flex" >
                <Card className={`${classes.cardbackground}`}>
                  <Button
                    type="submit"
                    className={`${classes.primarybutton} ${classes.font} my-2 mx-2`}
                  // size="md"
                    onMouseEnter={e => {
                      const buttonClasses = (e.target as HTMLButtonElement)
                        ?.classList
                      buttonClasses?.remove(classes.primarybutton)
                      buttonClasses?.add(classes.primarybuttonHover)
                    }}
                    onMouseLeave={e => {
                      const buttonClasses = (e.target as HTMLButtonElement)
                        ?.classList
                      buttonClasses?.remove(classes.primarybuttonHover)
                      buttonClasses?.add(classes.primarybutton)
                    }}
                  >
                    BOOK DEPARTURE
                  </Button>

                  <Card.Img
                    className="img-responsive bottom-block"
                    variant="middle"
                    alt={"Image"}
                    src={DepartureProductImg}
                  />
                  <Card.Body className={`${classes.cardtextColor} ${classes.font}`}>
                    <Card.Text className="mb-0">
                      Continue your vacation and enjoy our "happy everafter" with preferential fast track, impressive services and top class amenities of our culturally inspired lounges.
                    </Card.Text>
                  </Card.Body>

                  <Link
                    to="/"
                    className="btn p-0 no-btn-border"
                  // onClick={showPriceModal}
                  >
                    <Card.Footer className={`${classes.cardtextColor} ${classes.font} align-items-center text-center p-3`}>
                      View Price
                    </Card.Footer>
                  </Link>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="my-4">
            <Row>
              <div >
                <Row className="text-center">
                  <Col sm={12} md={4} className="offset-md-4">
                    <h3 className={`${classes.bodytextColor} ${classes.font}`}>LOUNGE SERVICES</h3>
                    <h4 className={`${classes.bodytextColor} ${classes.font}`}>For Priority Pass/ Diners Club</h4>
                    <h5 className={`${classes.bodytextColor} ${classes.font}`}>Please select your desired service</h5>
                  </Col>
                </Row>
                <Col className="offset-md-4 col-md-4 d-flex">
                  <Card className={`${classes.cardbackground}`}>
                    <Button
                      type="submit"
                      className={`${classes.primarybutton} ${classes.font} my-2 mx-2`}
                      // size="md"
                      onMouseEnter={e => {
                        const buttonClasses = (e.target as HTMLButtonElement)
                          ?.classList
                        buttonClasses?.remove(classes.primarybutton)
                        buttonClasses?.add(classes.primarybuttonHover)
                      }}
                      onMouseLeave={e => {
                        const buttonClasses = (e.target as HTMLButtonElement)
                          ?.classList
                        buttonClasses?.remove(classes.primarybuttonHover)
                        buttonClasses?.add(classes.primarybutton)
                      }}
                    >
                      PRIORITY PASS/DINERS CLUB BOOK DEPARTURE
                    </Button>

                    <Card.Img
                      className="img-responsive bottom-block"
                      variant="middle"
                      alt={"Image"}
                      src={DepartureProductImg}
                    />
                    <Card.Body className={`${classes.cardtextColor} ${classes.font}`}>
                      <Card.Text className="mb-0">
                        Continue your vacation and enjoy our "happy everafter" with preferential fast track, impressive services and top class amenities of our culturally inspired lounges.
                      </Card.Text>
                    </Card.Body>

                    <Link
                      to="/"
                      className="btn p-0 no-btn-border"
                    // onClick={showPriceModal}
                    >
                      <Card.Footer className={`${classes.cardtextColor} ${classes.font} align-items-center text-center p-3`}>
                        View Price
                      </Card.Footer>
                    </Link>
                  </Card>
                </Col>
              </div>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="my-4">
            <Row>
              <div >
                <Row className="text-center ">
                  <Col sm={12} md={4} className="offset-md-4">
                    <h4 className={`${classes.bodytextColor} ${classes.font}`}>For Digicel Executive Card</h4>
                    <h5 className={`${classes.bodytextColor} ${classes.font}`}>Please select your desired service</h5>
                  </Col>
                </Row>
                <Col className="offset-md-4 col-md-4 d-flex">
                  <Card className={`${classes.cardbackground}`}>
                    <Button
                      type="submit"
                      className={`${classes.primarybutton} ${classes.font} my-2 mx-2`}
                      // size="md"
                      onMouseEnter={e => {
                        const buttonClasses = (e.target as HTMLButtonElement)
                          ?.classList
                        buttonClasses?.remove(classes.primarybutton)
                        buttonClasses?.add(classes.primarybuttonHover)
                      }}
                      onMouseLeave={e => {
                        const buttonClasses = (e.target as HTMLButtonElement)
                          ?.classList
                        buttonClasses?.remove(classes.primarybuttonHover)
                        buttonClasses?.add(classes.primarybutton)
                      }}
                    >
                      DIGICEL EXECUTIVE CARD BOOK DEPARTURE
                    </Button>

                    <Card.Img
                      className="img-responsive bottom-block"
                      variant="middle"
                      alt={"Image"}
                      src={DepartureProductImg}
                    />
                    <Card.Body className={`${classes.cardtextColor} ${classes.font}`}>
                      <Card.Text className="mb-0">
                        Continue your vacation and enjoy our "happy everafter" with preferential fast track, impressive services and top class amenities of our culturally inspired lounges.
                      </Card.Text>
                    </Card.Body>

                    <Link
                      to="/"
                      className="btn p-0 no-btn-border"
                    // onClick={showPriceModal}
                    >
                      <Card.Footer className={`${classes.cardtextColor} ${classes.font} align-items-center text-center p-3`}>
                        View Price
                      </Card.Footer>
                    </Link>
                  </Card>
                </Col>
              </div>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="my-4 d-flex justify-content-center">
            <Card className={`${classes.cardbackground}`}
             style={{
              width: "30rem",
              height: "auto",
              padding: "5px",
            }}>
              <Row>
                <Col sm={12} md={7}>
                  <Card.Body className={`${classes.cardtextColor} ${classes.font}`}>
                    <h3>E-GIFT CARD</h3>
                    <div className="align-content-center">
                      <p>
                        VIP Attractions e-Gift Card is a perfect gift for any occasion! It acts like a debit card – you choose the service you would like to give and the recipient can redeem it when they are ready to travel.
                      </p>
                    </div>
                    <Link to={"/"} className="text-decoration-none">
                      <Button
                        type="submit"
                        className= {`${classes.primarybutton} ${classes.font} w-100`}
                        onMouseEnter={e => {
                          const buttonClasses = (e.target as HTMLButtonElement)
                            ?.classList
                          buttonClasses?.remove(classes.primarybutton)
                          buttonClasses?.add(classes.primarybuttonHover)
                        }}
                        onMouseLeave={e => {
                          const buttonClasses = (e.target as HTMLButtonElement)
                            ?.classList
                          buttonClasses?.remove(classes.primarybuttonHover)
                          buttonClasses?.add(classes.primarybutton)
                        }}
                      > 
                      Get Started
                      </Button>
                    </Link>
                  </Card.Body>
                </Col>
                <Col sm={12} md={5} className=" justify-content-center">
                  <img
                    src={giftCard1}
                    height="200"
                    width="124"
                    className=" p-1 mx-3 align-center"
                    alt="Gift Card"
                  />
                  <img
                    src={giftCard2}
                    height="100"
                    width="147"
                    className="d-inline-block p-1 mx-3 align-center"
                    alt="Gift Card"
                  />
                </Col>
              </Row>
            </Card>
          </Container>
        </section>

        <section className={classes.subfooterbackground}>
          <Container fluid="xxl">
            <Row>
              <Col md="12" className="my-2 p-2">
                <p className={`${classes.subfootertextColor} ${classes.font}`}>
                  For groups of 25 persons or more, please contact our groups department at +1-876-619-1565 or groups@vipattractions.com. <br />
                  You can also reach us via Skype at 954-837-6290
                </p>
                <div className="d-flex justify-content-center">
                  <img width="300" alt="visa mastercard" src={visamaster} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}
export default Home;