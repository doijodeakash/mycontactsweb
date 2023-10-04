import { Input } from "reactstrap";
import { ErrorMessage, getIn } from "formik";

const TextField = (props) => {
  const {
    field: { name },
    form: { setFieldValue, values, errors, touched, handleSubmit },
    placeholder,
    type,
    className,
  } = props;

  const errorMessage = getIn(errors, name);
  const isTouched = getIn(touched, name);

  const renderError = () => {
    return <p className="error-msg">{errorMessage}</p>;
  };
  return (
    <div className="input-text flex-row justify-content-start">
      <Input
        value={values[name]}
        style={styles}
        type={type}
        onKeyUpCapture={({ key }) => {
          if (key === "Enter" && (name === "password" || name === "search")) {
            handleSubmit();
          }
        }}
        className={className}
        onChange={(e) => {
          setFieldValue(name, e.target.value.toString());
        }}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} render={renderError} />
    </div>
  );
};

export default TextField;
const styles = {
  height: 40,
  width: "100%",
};
