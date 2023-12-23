import { Field, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Spinner } from "reactstrap";
import TextField from "src/common/components/TextField";
import { UserLogin, UserDetails } from "src/store/actions";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, loading } = useSelector((state) => state.Login);
  useEffect(() => {}, [loading]);
  const { loginForm } = useSelector((state) => state.Login);
  const dispatch = useDispatch();
  const onSubmit = async (values, { setSubmitting }) => {
    const obj = {
      ...values,
      login_as: "easyfied",
    };
    setSubmitting(true);
    try {
      const res = await dispatch(UserLogin(obj)).unwrap();
      setSubmitting(false);
      if (res) {
        // navigate('/dashboard')
        dispatch(UserDetails());
      }
    } catch (err) {
      setSubmitting(false);
      if (err) {
        // toast.error(err);
      }
    }
  };

  const handleLogin = (formikbag) => {
    console.log("formikbag--->", formikbag);
    dispatch(UserLogin(formikbag));
    // dispatch;
  };

  useEffect(() => {
    if (isAuth && !loading) {
      console.log("navigating");
      navigate("/dashboard");
    }
  }, []);

  const validateLoginForm = Yup.object({
    email: Yup.string().required("User name required "),
    password: Yup.string().required("User name required "),
  });

  return (
    <div className="d-flex justify-content-center m-4">
      <Row className="shadow-lg p-3 mb-5 bg-white rounded">
        <Col>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(formikbag) => handleLogin(formikbag)}
            validationSchema={validateLoginForm}
          >
            {({ errors, values, setFieldValue, handleSubmit }) => {
              return (
                <Card className="card border-0">
                  <Row>
                    <Col className="contact-form">
                      <Field
                        name="email"
                        type="text"
                        placeholder="User Name"
                        component={TextField}
                      />
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        component={TextField}
                      />
                      <Button
                        color="primary"
                        title="Save"
                        className="input-btn"
                        onClick={handleSubmit}
                      >
                        {loading && (
                          <Spinner color="primary" size={"sm"} type="border" />
                        )}
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Card>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
