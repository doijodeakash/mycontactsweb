import { Input, Label } from "reactstrap";
import { ErrorMessage, getIn } from "formik";
import { useEffect, useState } from "react";

const FormikImage = (props) => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState("");
  const {
    field: { name },
    form: { setFieldValue, values, errors, touched },
  } = props;

  const errorMessage = getIn(errors, name);
  const isTouched = getIn(touched, name);

  const renderError = () => {
    return <p className="error-msg">{errorMessage}</p>;
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;

        resolve(baseURL);
      };
    });
  };

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    const file = e.target.files[0];
    const base64 = await getBase64(file);
    setFieldValue(name, base64);
  };

  useEffect(() => {
    setFieldValue("file", file);
    setFieldValue("fileName", fileName);
  }, [file, fileName]);

  return (
    <div className="input-image">
      {values[name] ? (
        <>
          <img src={values[name]} alt="img" className="input-img" />
          <div className="img-close" onClick={() => setFieldValue(name, "")}>
            <span>
              <i
                style={{ color: "red", height: 35, width: 35 }}
                className="bi bi-trash input-trash"
              ></i>
            </span>
          </div>
        </>
      ) : (
        <div className="input-container flex-row">
          <input
            type="file"
            onChange={handleFile}
            name="file"
            id="file"
            className="inputfile"
          />
          <Label className="m-0" for="file">
            Upload Image
          </Label>
          <ErrorMessage name={name} render={renderError} />
        </div>
        // <input type="file" onChange={handleFile} />
      )}
    </div>
  );
};

export default FormikImage;
const styles = {
  height: 40,
  width: "100%",
};
