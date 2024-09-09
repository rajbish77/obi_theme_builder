import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback } from "react";
import { Typography, styled } from "@mui/material";
import { Button, Col, Row, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Affiliate, AuthState } from "../types";
import { defaultThemeOptions } from "../defaultTheme";
import Loader from "../Loader";
import { HandleAPIError, logout } from "../commonFunction";
import { faUser, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { affiliate } from "../slices/affiliateTheme";
import { affiliateData } from "../slices/affiliateName";
import { setPreview } from "../slices/commonSlice/preview";
import { affiliateTheme , loadSavedTheme, setAffiliateId } from "../slices/commonSlice/themeSlice";

// Define styled components
const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  lineHeight: theme.typography.h6.fontSize,
  fontFamily: theme.typography.fontFamily,
}));

const Version = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  lineHeight: theme.typography.caption.fontSize,
  fontWeight: 700,
}));

const Toolbar = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const NavAppBar = styled("div")({
  justifyContent: "space-between",
  flexDirection: "row",
  backgroundColor: "#000",
  color: "#fff",
});

const LogOutDropdown = styled("div")({
  width: "33%",
  position: "relative",
  zIndex:"9999",
  display: "flex",
  justifyContent: "end",
  padding: "0px ",
  paddingRight:"25px",
})

const Header = () => {
  const dispatch = useAppDispatch();
  const affiliateNameData = useAppSelector((state) => state.fetchAffiliate.affiliate);
  const [showDropdown, setShowDropdown] = useState(false);
  const dataEdiPubl = useAppSelector((state) => state.logIn);
  const [searchResult, setSearchResult] = useState<Affiliate[]>([]);
  const loading = useAppSelector((state) => state.affiliateData.loading);
  const affiliateThemeData = useAppSelector((state) => state.affiliateData);
  const getDataOn = useAppSelector((state) => state.theme.affiliateTheme);
  const dataTheme = useAppSelector( (state) => state.theme.themeOptions);
  
  console.log(affiliateThemeData.affiliateid)

  const styleObj = {
    color: "black",
    zIndex: 1022,
    width: "270px",
  };

  const fetchAffiliateApi = useCallback(async () => {
    try {
      const data = {
        themebuilder: "Y"
      };
      dispatch(affiliateData(data));
    } catch (error) {
      HandleAPIError(error);
    }
  }, [dispatch]);

  const getAffililateTheme = useCallback(async (id?: number) => {
    let affiliateId = id ? id : 0;
    dispatch(setAffiliateId(`${affiliateId}`));

    const request = {
      affiliateid: affiliateId
    };

    if (affiliateId !== null) {
      try {
        await dispatch(affiliate(request)).unwrap();
      } catch (error) {
        HandleAPIError(error);
      };
    } else {
      dispatch(affiliateTheme((defaultThemeOptions)));
    };
  }, [dispatch]);
  
  const themeObject: any = affiliateThemeData.preview;

  useEffect(() => {
    if (affiliateThemeData.status === "0") {
      dispatch(setPreview(affiliateThemeData.preview));
      if (affiliateThemeData.preview === null) {
        dispatch(affiliateTheme(defaultThemeOptions));
        // dispatch(loadSavedTheme(themeObject));
      } else {
        dispatch(loadSavedTheme(themeObject));
        dispatch(affiliateTheme(themeObject));
      }
    }
  }, [affiliateThemeData]);

  useEffect(() => {
    if (affiliateNameData.length === 0) {
      fetchAffiliateApi();
    } else {
      setSearchResult(affiliateNameData);
    }
  }, [affiliateNameData, fetchAffiliateApi]);

  const handleOnSearch = (string: any) => {
    const searchTerm = string.toLowerCase();
    const filteredData = affiliateNameData.filter((item: any) => item.name.toLowerCase().includes(searchTerm));
    setSearchResult(filteredData.length > 0 ? filteredData : [{ id: -1, name: 'Not found' }]);
  };

  const handleOnHover = () => { };

  const handleOnSelect = (item: any) => {
    getAffililateTheme(item?.id);
  };

  const handleOnFocus = () => { };

  const formatResult = (item: any) => (
    <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
  );

  const editorHeader = () => (
    <Col md={"8"} className="d-flex justify-content-start align-items-center">
      <Title variant="h6" className="fw-semibold text-dark align-items-center mx-2">
        Select Affiliate
      </Title>
      <div style={styleObj} className="py-1">
        <ReactSearchAutocomplete
          items={searchResult}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          showIcon={false}
          placeholder="Search Affiliate"
          className="rounded-input"
          styling={{ borderRadius: '4px' }}
        />
      </div>
      <Button className="btn-primary btn-sm py-1 mx-2 ms-3 shadow-lg" onClick={fetchAffiliateApi}>
        Refresh Affiliate List {" "}
        <FontAwesomeIcon icon={faRotate} />
      </Button>
    </Col>
  );

  const publisherHeader = () => (
    <Col md={"6"} className="d-flex justify-content-start">
      <h3 className="align-items-center text-dark mx-2 .fs-1 fw-bold mb-0">
        Theme-Builder
      </h3>
    </Col>
  );

  const getdataofHeader = () => {
    if (dataEdiPubl.auth && dataEdiPubl.editor === "Y") {
      return editorHeader();
    } else if (dataEdiPubl.auth && dataEdiPubl.publisher === "Y") {
      return publisherHeader();
    }
    return null;
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="px-3 bg-body-secondary shadow">
        <Row className="align-items-center justify-content-between py-3">
          {getdataofHeader()}
          <LogOutDropdown>
            <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)} className="dropdown-center">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="shadow-lg btn-grey">
                <FontAwesomeIcon icon={faUser} size="sm" />
              </Dropdown.Toggle>
              <Dropdown.Menu className=" " style={{ zIndex: 1023 }}>
                <Dropdown.Item disabled className="text-dark">
                  {dataEdiPubl.username}
                </Dropdown.Item>
                <Dropdown.Item
                  className="bg-danger text-white"
                  onClick={() => {
                    logout(dataEdiPubl);
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </LogOutDropdown>
        </Row>
      </div>
    </>
  );
};

export default Header;
