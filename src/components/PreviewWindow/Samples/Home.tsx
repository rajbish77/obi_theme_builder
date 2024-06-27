import { styled } from "@mui/material/styles";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import ArrivalProductImg from "../../../images/pic2_resized.jpg";
import DepartureProductImg from "../../../images/pic3_resized.jpg";
import BundleProductImg from "../../../images/pic1_resized.jpg";
import giftCard1 from "../../../images/gift-card-1.png";
import giftCard2 from "../../../images/gift-card-2.png";
import visamaster from "../../../images/visa-master-card.png";
import { Link } from "react-router-dom";
import React from "react";

const theme = {
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  palette: {
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#333333",
    },
    primary: {
      main: "#007bff",
      contrastText: "#ffffff",
    },
  },
};

const StyledDiv = styled("div")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.background.default,
}));

const StyledSection = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  textAlign: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main} !important`,
  color: `${theme.palette.primary.contrastText} !important`,
  border: `1px solid ${theme.palette.primary.main} !important`,
  boxShadow: `0 3px 1px -2px ${theme.palette.primary.main}, 0 2px 2px 0 ${theme.palette.primary.main}, 0 1px 5px 0 ${theme.palette.primary.main} !important`,
  '&:hover': {
    backgroundColor: `${theme.palette.primary.dark} !important`,
    color: `${theme.palette.primary.contrastText} !important`,
    border: `1px solid ${theme.palette.primary.main} !important`,
    boxShadow: `2px 2px 4px 1px ${theme.palette.primary.main}, 2px 2px 4px 1px ${theme.palette.primary.main}, 2px 2px 4px 1px ${theme.palette.primary.main}, 2px 2px 4px 1px ${theme.palette.primary.main} !important`,
  },
}));

function Home() {
  return (
    <StyledDiv>
      <StyledSection>
        <Container className="py-4">
          <h3 className="mb-3 d-flex justify-content-center">
            <span className="heading">LOUNGE SERVICES</span>
          </h3>
          <h4 className="my-3 d-flex justify-content-center">
            Please select your product
          </h4>
        </Container>
      </StyledSection>

      <section>
        <Container className="my-4">
          <Row className="d-flex justify-content-center">
            <Col className="col-md-4 d-flex">
              <Card>
                <StyledButton type="submit" className="my-2 mx-2">
                  BOOK ARRIVAL & DEPARTURE
                </StyledButton>

                <Card.Img
                  className="img-responsive bottom-block"
                  variant="middle"
                  alt={"Image"}
                  src={BundleProductImg}
                />
                <Card.Body>
                  <Card.Text className="mb-0">
                    Enjoy your first and last impression of the beautiful island with Jamaicas Personalized and Expedited Airport Concierge Lounge Services where you RELAX. CONNECT and DISCOVER our gateway to paradise.
                  </Card.Text>
                </Card.Body>

                <Link to="/" className="btn p-0 no-btn-border">
                  <Card.Footer className="align-items-center text-center p-3">
                    View Price
                  </Card.Footer>
                </Link>
              </Card>
            </Col>
            <Col className="col-md-4 d-flex">
              <Card>
                <StyledButton type="submit" className="my-2 mx-2">
                  BOOK ARRIVAL
                </StyledButton>

                <Card.Img
                  className="img-responsive bottom-block"
                  variant="middle"
                  alt={"Image"}
                  src={ArrivalProductImg}
                />
                <Card.Body>
                  <Card.Text className="mb-0">
                    Maximize your time in paradise; enjoy personalized escort services with preferential fast track through immigration and customs whilst you access Jamaicas premier arrival lounge where culture meets comfort.
                  </Card.Text>
                </Card.Body>

                <Link to="/" className="btn p-0 no-btn-border">
                  <Card.Footer className="align-items-center text-center p-3">
                    View Price
                  </Card.Footer>
                </Link>
              </Card>
            </Col>
            <Col className="col-md-4 d-flex">
              <Card>
                <StyledButton type="submit" className="my-2 mx-2">
                  BOOK DEPARTURE
                </StyledButton>

                <Card.Img
                  className="img-responsive bottom-block"
                  variant="middle"
                  alt={"Image"}
                  src={DepartureProductImg}
                />
                <Card.Body>
                  <Card.Text className="mb-0">
                    Continue your vacation and enjoy our "happy everafter" with preferential fast track, impressive services and top class amenities of our culturally inspired lounges.
                  </Card.Text>
                </Card.Body>

                <Link to="/" className="btn p-0 no-btn-border">
                  <Card.Footer className="align-items-center text-center p-3">
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
            <div>
              <Row className="text-center">
                <Col sm={12} md={4} className="offset-md-4">
                  <h3>LOUNGE SERVICES</h3>
                  <h4>For Priority Pass/ Diners Club</h4>
                  <h5>Please select your desired service</h5>
                </Col>
              </Row>
              <Col className="offset-md-4 col-md-4 d-flex">
                <Card>
                  <StyledButton type="submit" className="my-2 mx-2">
                    BOOK ARRIVAL
                  </StyledButton>

                  <Card.Img
                    className="img-responsive bottom-block"
                    variant="middle"
                    alt={"Image"}
                    src={giftCard1}
                  />
                  <Card.Body>
                    <Card.Text className="mb-0">
                      Enjoy personalized escort services with preferential fast track through immigration and customs, access to premier arrival lounge where culture meets comfort.
                    </Card.Text>
                  </Card.Body>

                  <Link to="/" className="btn p-0 no-btn-border">
                    <Card.Footer className="align-items-center text-center p-3">
                      View Price
                    </Card.Footer>
                  </Link>
                </Card>
              </Col>
              <Col className="offset-md-4 col-md-4 d-flex mt-3">
                <Card>
                  <StyledButton type="submit" className="my-2 mx-2">
                    BOOK DEPARTURE
                  </StyledButton>

                  <Card.Img
                    className="img-responsive bottom-block"
                    variant="middle"
                    alt={"Image"}
                    src={giftCard2}
                  />
                  <Card.Body>
                    <Card.Text className="mb-0">
                      Continue your vacation with preferential fast track and enjoy impressive services and top class amenities of our culturally inspired lounges.
                    </Card.Text>
                  </Card.Body>

                  <Link to="/" className="btn p-0 no-btn-border">
                    <Card.Footer className="align-items-center text-center p-3">
                      View Price
                    </Card.Footer>
                  </Link>
                </Card>
              </Col>
              <Row className="text-center">
                <Col sm={12} md={4} className="offset-md-4">
                  <img
                    src={visamaster}
                    alt="Visa Mastercard"
                    className="img-responsive img-fluid mt-5"
                  />
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </section>
    </StyledDiv>
  );
}

export default Home;
