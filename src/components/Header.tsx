import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback } from "react";
import { Typography, styled } from "@mui/material";
import { Button, Col, Row, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { loadSavedTheme, setAffiliateId } from "../state/themeSlice";
import { Affiliate, AuthState } from "../slices/types";
import { defaultThemeOptions } from "../siteTheme";
import Loader from "../Loader";
import { HandleAPIError, logout } from "../commonFunction";
import { faUser, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { affiliate } from "../slices/affiliateTheme";
import { affiliateData } from "../slices/affiliateName";
import { setPreview } from "../slices/Common Slice/preview";
import { setlive } from "../slices/Common Slice/live";

// Define styled components
const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  lineHeight: theme.typography.h6.fontSize,
  fontFamily: theme.typography.fontFamily
}));

const Version = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  lineHeight: theme.typography.caption.fontSize,
  fontWeight: 700,
}));

const Toolbar = styled('div')({
  display: "flex",
  justifyContent: "space-between",
});

const NavAppBar = styled('div')({
  justifyContent: "space-between",
  flexDirection: "row",
  backgroundColor: "#000",
  color: "#fff"
});

const Header = ({ siteTitle = `` }) => {
  const dispatch = useAppDispatch();
  const affiliateNameData = useAppSelector((state) => state.fetchAffiliate.affiliate);
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = useSelector((state: AuthState) => state.auth);
  const dataEdiPubl = useAppSelector((state) => state.logIn);
  const [searchResult, setSearchResult] = useState<Affiliate[]>([]);
  const loading = useAppSelector((state) => state.affiliateData.loading);
  const affiliateDataID = useAppSelector((state) => state.affiliateData);

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
    let affiliateId = id ? id : 1;
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
      dispatch(loadSavedTheme(defaultThemeOptions));
    };
  }, [dispatch]);

  useEffect(() => {
    if (affiliateDataID.status === "0") {
      dispatch(setPreview(affiliateDataID.preview));
      dispatch(setlive(affiliateDataID.live));
    };
  }, [affiliateDataID, dispatch]);

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
      <div className="px-3 bg-grey shadow">
        <Row className="align-items-center py-3">
          {getdataofHeader()}
          <Col className="d-flex justify-content-end">
            <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)} className="dropdown-center">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="shadow-lg btn-grey">
                <FontAwesomeIcon icon={faUser} size="sm" />
              </Dropdown.Toggle>
              <Dropdown.Menu className=" " style={{ zIndex: 1023 }}>
                <Dropdown.Item disabled className="text-dark">{dataEdiPubl.username}</Dropdown.Item>
                <Dropdown.Item className="bg-danger text-white" onClick={() => { logout(dataEdiPubl) }}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

export default Header;
