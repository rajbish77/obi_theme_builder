import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import {
  Typography,
  IconButton,
  Hidden,
  styled
} from "@mui/material"
import { Button, Col, Row, Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { affiliateTheme, loadSavedTheme, setAffiliateId } from "../state/themeSlice"
import { AuthState } from "../slices/types"
import { defaultThemeOptions } from "../siteTheme"
import Loader from "../Loader"
import BrushIcon from '@mui/icons-material/Brush';
import { getaffiliates } from "../apicalls"
import { showError } from "./Swal"
import { HandleAPIError, _getAffiliate, getEditorLoginStatus, getPublisherLoginStatus, logout } from "../commonFunction"
import { faUser, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

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

interface AffiliateItem {
  id: number;
  name: string;
}

const Header = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false)
  const auth = useSelector((state: AuthState) => state.auth);
  const AffiliateData: any = useSelector((state: AuthState) => state.affiliate);
  const [searchResult, setSearchResult] = useState<AffiliateItem[]>([]);

  const styleObj = {
    color: "black",
    zIndex: 1022,
    width: "270px",
  }

  const fetchAffiliateApi = async () => {
    try {
      setLoading(true);
      const data = {
        themebuilder: "Y"
      }
      const response = await getaffiliates(data);
      if (response?.status === 0) {
        _getAffiliate(response?.data,)
      } else {
        showError("Error", response?.statusMessage);
      }
    } catch (error) {
      HandleAPIError(error)
    } finally {
      setLoading(false);
    }
  };

  const getAffililateTheme = async (id?: number) => {
    let affiliateId = id ? id : 1;
    dispatch(setAffiliateId(`${affiliateId}`))
    const request = {
      affiliateid: affiliateId
    }
    if (affiliateId !== null) {
      try {
        setLoading(true);
        const response = await getaffiliates(request);
        if (response?.status === 0) {
          if (response?.data?.affiliates[0]?.theme?.preview === '') {
            dispatch(loadSavedTheme(defaultThemeOptions))
          } else {
            const themeOptions = JSON.parse(response?.data?.affiliates[0]?.theme?.preview);
            dispatch(loadSavedTheme(themeOptions));
            dispatch(affiliateTheme(themeOptions));
          }
        } else {
          dispatch(loadSavedTheme(defaultThemeOptions))
        }
      } catch (error) {
        HandleAPIError(error)
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(loadSavedTheme(defaultThemeOptions))
    }
  }

  useEffect(() => {
    if ((AffiliateData.length === undefined)) {
      fetchAffiliateApi();
      console.log(AffiliateData)
    }
    if (AffiliateData.length !== undefined) {
      handleOnSearch("", "");
    }
  }, [AffiliateData]);

  const handleOnSearch = (string?: any, results?: any) => {
    const searchTerm = string?.toLowerCase();
    if (AffiliateData) {
      const filteredResults = AffiliateData?.filter((item: AffiliateItem) =>
        item?.name?.toLowerCase()?.includes(searchTerm)
      );
      setSearchResult(filteredResults?.length > 0 ? filteredResults : [{ id: -1, name: 'Not found' }]);
    } else {
      setSearchResult([]);
    }
  };

  const handleOnHover = (result: any) => {}

  const handleOnSelect = (item: any) => {
    getAffililateTheme(item?.id)
  }

  const handleOnFocus = () => {}

  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  const editorHeader = () => {
    return (
      <>
        <Col md={"8"} className="d-flex justify-content-start align-items-center">
          <Title variant="h6" className="fw-semibold text-dark align-items-center mx-2">
            Select Affiliate:
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
          <Button className="btn-primary btn-sm py-1 mx-2 ms-3 shadow-lg" onClick={() => { fetchAffiliateApi() }}>
            Refresh Affiliate List {" "}
            <FontAwesomeIcon
              icon={faRotate}
            />
          </Button>
        </Col>
        <Col md={"2"} className="d-flex justify-content-end py-2">
          <Hidden smUp>
            <IconButton className="text-white" onClick={() => dispatch({ type: "TOGGLE_THEME_CONFIG" })}>
              <BrushIcon />
            </IconButton>
          </Hidden>
        </Col>
      </>
    );
  }

  const publisherHeader = () => {
    return (
      <Col md={"6"} className="d-flex justify-content-start">
        <h3 className="align-items-center text-dark mx-2 .fs-1 fw-bold mb-0">
          Theme-Builder
        </h3>
      </Col>
    );
  }
  
  return (
    <>
      <Loader loading={loading} />
      <div className="px-3 bg-grey shadow">
        <Row className="align-items-center py-3">
          {/* Editor header */}
          {getEditorLoginStatus(auth) && editorHeader()}

          {/* Publisher header */}
          {getPublisherLoginStatus(auth) && publisherHeader()}

          <Col md={getEditorLoginStatus(auth) ? "2" : "6"} className="d-flex justify-content-end">
            <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)} className="dropdown-center">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="shadow-lg btn-grey">
                <FontAwesomeIcon
                  icon={faUser}
                  size="sm"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className=" " style={{ zIndex: 1023 }}>
                <Dropdown.Item disabled className="text-dark">{auth.userName}</Dropdown.Item>
                <Dropdown.Item className="bg-danger text-white" onClick={() => { logout(dispatch) }}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
