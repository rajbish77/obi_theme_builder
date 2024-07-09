import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ArrivalProductImg from "../../../images/pic2_resized.jpg";
import DepartureProductImg from "../../../images/pic3_resized.jpg";
import BundleProductImg from "../../../images/pic1_resized.jpg";
import giftCard1 from "../../../images/gift-card-1.png";
import giftCard2 from "../../../images/gift-card-2.png";
import visamaster from "../../../images/visa-master-card.png";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const LOGOS_URL = "https://nigeria.reliablesoftjm.com/images/logos/JAM.png";

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.body.backgroundcolor,
}));

const SubfooterContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.subfooter.backgroundcolor,
  color: theme.palette.subfooter.textcolor,
  textAlign: "center",
  padding: theme.spacing(2),
  maxWidth: "1366px",
  margin: "25px 0px",
}));

const Heading = styled('h3')(({ theme }) => ({
  color: theme.palette.body.textcolor,
  fontFamily: theme.typography.fontFamily,
}));

const Subheading = styled('h4')(({ theme }) => ({
  color: theme.palette.body.textcolor,
  fontFamily: theme.typography.fontFamily,
}));

const CardBody = styled(Card.Body)(({ theme }) => ({
  backgroundColor: theme.palette.body.backgroundcolor,
  color: theme.palette.body.textcolor,
  fontFamily: theme.typography.fontFamily,
}));

const CardText = styled(Card.Text)(({ theme }) => ({
  color: theme.palette.body.textcolor,
  fontFamily: theme.typography.fontFamily,
}));

const CardFooter = styled(Card.Footer)(({ theme }) => ({
  color: theme.palette.body.textcolor,
  fontFamily: theme.typography.fontFamily,
  textAlign: 'center',
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: `${theme.palette.button.primary.background} !important`,
  color: `${theme.palette.button.primary.color} !important`,
  border: `1px solid ${theme.palette.button.primary.border} !important`,
  boxShadow: `0 3px 1px -2px ${theme.palette.button.primary.boxshadow}, 0 2px 2px 0 ${theme.palette.button.primary.boxshadow}, 0 1px 5px 0 ${theme.palette.button.primary.boxshadow} !important`,
}));

const Home = () => {
  return (
    <StyledDiv>
      <section>
        <Container className="py-4">
          <Heading className="mb-3 d-flex justify-content-center">
            LOUNGE SERVICES
          </Heading>
          <Subheading className="my-3 d-flex justify-content-center">
            Please select your product
          </Subheading>
        </Container>
      </section>
      <section>
        <Container className="my-4">
          <Row className="d-flex justify-content-center">
            <Col className="col-md-4 d-flex">
              <Card className="w-100">
                <StyledDiv className="p-2">
                  <PrimaryButton type="submit" className="w-100">
                    BOOK ARRIVAL & DEPARTURE
                  </PrimaryButton>
                </StyledDiv>
                <Card.Img
                  className="img-responsive bottom-block"
                  variant="middle"
                  alt="Image"
                  src={BundleProductImg}
                />
                <CardBody>
                  <CardText>
                    Enjoy your first and last impression of the beautiful island with Jamaicas Personalized and Expedited Airport Concierge Lounge Services where you RELAX. CONNECT and DISCOVER our gateway to paradise.
                  </CardText>
                </CardBody>
                <Link to="#" className="btn p-0 no-btn-border border-0">
                  <StyledDiv>
                    <CardFooter>
                      View Price
                    </CardFooter>
                  </StyledDiv>
                </Link>
              </Card>
            </Col>
            <Col className="col-md-4 d-flex">
              <Card className="w-100">
                <StyledDiv className="p-2">
                  <PrimaryButton type="submit" className="w-100">
                    BOOK ARRIVAL
                  </PrimaryButton>
                </StyledDiv>
                <Card.Img
                  className="img-responsive bottom-block"
                  variant="middle"
                  alt="Image"
                  src={ArrivalProductImg}
                />
                <CardBody>
                  <CardText>
                    Maximize your time in paradise; enjoy personalized escort services with preferential fast track through immigration and customs whilst you access Jamaicas premier arrival lounge where culture meets comfort.
                  </CardText>
                </CardBody>
                <Link to="#" className="btn p-0 no-btn-border border-0">
                  <StyledDiv>
                    <CardFooter>
                      View Price
                    </CardFooter>
                  </StyledDiv>
                </Link>
              </Card>
            </Col>
            <Col className="col-md-4 d-flex">
              <Card className="w-100">
                <StyledDiv className="p-2">
                  <PrimaryButton type="submit" className="w-100">
                    BOOK DEPARTURE
                  </PrimaryButton>
                </StyledDiv>
                <Card.Img
                  className="img-responsive bottom-block"
                  variant="middle"
                  alt="Image"
                  src={DepartureProductImg}
                />
                <CardBody>
                  <CardText>
                    Continue your vacation and enjoy our "happy everafter" with preferential fast track, impressive services and top class amenities of our culturally inspired lounges.
                  </CardText>
                </CardBody>
                <Link to="#" className="btn p-0 no-btn-border border-0">
                  <StyledDiv>
                    <CardFooter>
                      View Price
                    </CardFooter>
                  </StyledDiv>
                </Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container className="my-4">
          <Row>
            <div>
              <Row className="text-center">
                <Col sm={12} md={4} className="offset-md-4">
                  <Heading>LOUNGE SERVICES</Heading>
                  <Subheading>For Priority Pass/ Diners Club</Subheading>
                  <Subheading className="my-3">Please select your desired service</Subheading>
                </Col>
              </Row>
              <Col className="offset-md-4 col-md-4 d-flex">
                <Card className="w-100">
                  <StyledDiv className="p-2">
                    <PrimaryButton type="submit" className="w-100">
                      PRIORITY PASS/DINERS CLUB BOOK DEPARTURE
                    </PrimaryButton>
                  </StyledDiv>
                  <Card.Img
                    className="img-responsive bottom-block"
                    variant="middle"
                    alt="Image"
                    src={DepartureProductImg}
                  />
                  <CardBody>
                    <CardText>
                      Continue your vacation and enjoy our "happy everafter" with preferential fast track, impressive services and top class amenities of our culturally inspired lounges.
                    </CardText>
                  </CardBody>
                  <Link to="#" className="btn p-0 no-btn-border border-0">
                    <StyledDiv>
                      <CardFooter>
                        View Price
                      </CardFooter>
                    </StyledDiv>
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
            <div>
              <Row className="text-center">
                <Col sm={12} md={4} className="offset-md-4">
                  <Subheading>For Digicel Executive Card</Subheading>
                  <Subheading className="my-3" >Please select your desired service</Subheading>
                </Col>
              </Row>
              <Col className="offset-md-4 col-md-4 d-flex">
                <Card className="w-100">
                  <StyledDiv className="p-2">
                    <PrimaryButton type="submit" className="w-100">
                      DIGICEL EXECUTIVE CARD BOOK DEPARTURE
                    </PrimaryButton>
                  </StyledDiv>
                  <Card.Img
                    className="img-responsive bottom-block"
                    variant="middle"
                    alt="Image"
                    src={DepartureProductImg}
                  />
                  <CardBody>
                    <CardText>
                      Continue your vacation and enjoy our "happy everafter" with preferential fast track, impressive services and top class amenities of our culturally inspired lounges.
                    </CardText>
                  </CardBody>
                  <Link to="#" className="btn p-0 no-btn-border border-0">
                    <StyledDiv>
                      <CardFooter>
                        View Price
                      </CardFooter>
                    </StyledDiv>
                  </Link>
                </Card>
              </Col>
            </div>
          </Row>
        </Container>
      </section>

      <section>
        <Container className="my-4 d-flex justify-content-center">
          <Card style={{ width: "30rem", height: "auto" }}>
            <StyledDiv>
              <Row>
                <Col sm={12} md={7}>
                  <CardBody>
                    <Heading>E-GIFT CARD</Heading>
                    <CardText>
                      VIP Attractions e-Gift Card is a perfect gift for any occasion! It acts like a debit card – you choose the service you would like to give and the recipient can redeem it when they are ready to travel.
                    </CardText>
                    <Link to="#" className="text-decoration-none">
                      <PrimaryButton type="submit" className="w-100">
                        Get Started
                      </PrimaryButton>
                    </Link>
                  </CardBody>
                </Col>
                <Col sm={12} md={5} className="justify-content-center">
                  <img
                    src={giftCard1}
                    height="200"
                    width="124"
                    className="p-1 mx-3"
                    alt="Gift Card"
                  />
                  <img
                    src={giftCard2}
                    height="100"
                    width="147"
                    className="d-inline-block p-1 mx-3"
                    alt="Gift Card"
                  />
                </Col>
              </Row>
            </StyledDiv>
          </Card>
        </Container>
      </section>

      <SubfooterContainer fluid="xxl">
        <Row>
          <Col md="12" className="my-2 p-2">
            <p>
              For groups of 25 persons or more, please contact our groups department at +1-876-619-1565 or groups@vipattractions.com. <br />
              You can also reach us via Skype at 954-837-6290
            </p>
            <div className="d-flex justify-content-center">
              <img width="300" alt="visa mastercard" src={visamaster} />
            </div>
          </Col>
        </Row>
      </SubfooterContainer>
    </StyledDiv>
  );
}

export default Home;
