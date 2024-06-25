import React, { useState, useEffect } from 'react'
import { Button, Card, Form, InputGroup } from "react-bootstrap";
// import { Link } from "gatsby"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PRIVILIGES_TYPE, PrivilegeType, THEMEEDITOR, THEMEPUBLISHER } from '../../../commonConstant';
import { showError } from '../../Swal';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { getAuthorizedLogin } from '../../../apicalls';
import Loader from '../../../Loader';
import { HandleAPIError } from '../../../commonFunction';
import { setLogIn } from '../../../slices/logInPage';
import { login, clearAuth, auth, userName, publisher, editor } from "../../../slices/logIn-slice"
import { RootState } from '../../../app/store';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const LoginForm = () => {
  const md5 = require('md5');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authData = useAppSelector(auth);
  const [displayPassword, setDisplayPassword] = useState(false);
  const loading = useAppSelector((state) => state.logIn.loading);
  const publisherData = useAppSelector(publisher);
  const editorData = useAppSelector(editor);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    previligesType: Yup.object().shape({
      value: Yup.string().required("Privilege Type is required"),
      label: Yup.string().required("Privilege Type is required"),
    }).required("Privilege Type is required"),
  });

  const handleSubmit = async (values: any) => {
    const { username, password, previligesType } = values;

    let userName = username.trim();
    let passWord = password.trim();
    let privilege = previligesType.value;

    try {
      const request = {
        username: userName,
        password: md5(passWord),
        privilege,
      };

      const response = await getAuthorizedLogin(request);
      if (response.status === 2) {
        dispatch(login(userName));
        dispatch(login(privilege));
      } else {
        showError("Error", response?.statusMessage);
      };

      if (publisherData === "Y") {
        navigate('/publisher-dashboard', { replace: true });
      } else if (editorData === "Y") {
        navigate('/editor-dashboard', { replace: true });
      } else {
        navigate('/');
      }
    } catch (error) {
      HandleAPIError(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      previligesType: null as PrivilegeType | null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const togglePassword = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <>
      <Loader loading={loading} />
      <section
        className='d-flex py-5 justify-content-center align-items-center bg-gray-200 min-vw-100 min-vh-100'
        style={{ backgroundColor: "#e5e7eb" }}
      >
        <Form style={{ width: "24rem" }} onSubmit={formik.handleSubmit}>
          <Card
            className='shadow-lg bg-white w-100'
            style={{ borderRadius: '2px', borderTop: "8px solid #4f46e5", padding: "3rem" }}
          >
            <h3 className='text-center fs-4 fw-bold'>Login</h3>
            <Card.Body className='p-0'>
              <Form.Label htmlFor="validationCustomUsername" className='mt-3'>
                Username
                <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={formik.touched.username && formik.errors.username ? "error d-flex" : "d-flex"}>
                <Form.Control
                  type="text"
                  id="validationCustomUsername"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.username && formik.errors.username ? "error" : ""}
                />
              </InputGroup>
              {formik.touched.username && formik.errors.username && <div className='errormessage'>{formik.errors.username}</div>}
              <Form.Label htmlFor="validationCustomPassword" className='mt-3'>
                Password
                <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={formik.touched.password && formik.errors.password ? "error d-flex" : "d-flex"}>
                <Form.Control
                  type={displayPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.password && formik.errors.password ? "error" : ""}
                />
                <FontAwesomeIcon
                  icon={displayPassword ? faEye : faEyeSlash}
                  size="sm"
                  className="icon-color"
                  onClick={togglePassword}
                  style={{
                    position: "absolute",
                    top: 11,
                    right: 10,
                    cursor: "pointer",
                    zIndex: "5",
                  }}
                />
              </InputGroup>
              {formik.touched.password && formik.errors.password && <div className='errormessage'>{formik.errors.password}</div>}
              <Form.Label htmlFor="privilegesType" className='mt-3'>
                Privilege
                <span className="text-danger">*</span>
              </Form.Label>
              <Select
                options={PRIVILIGES_TYPE}
                value={formik.values.previligesType}
                id="privilegesType"
                onBlur={formik.handleBlur}
                name="previligesType"
                onChange={(d) => formik.setFieldValue("previligesType", d)}
                className={formik.touched.previligesType && formik.errors.previligesType ? "error" : ""}
              />
              {formik.touched.previligesType && formik.errors.previligesType && <div className='errormessage'>{formik.errors.previligesType}</div>}
              <Button
                type='submit'
                size="sm"
                style={{ marginTop: "2rem", borderColor: '#007bff' }}
                className='form-control form-control-lg purple-gradient'
              >
                Login
              </Button>
            </Card.Body>
          </Card>
        </Form>
      </section>
    </>
  );
}

export default LoginForm;