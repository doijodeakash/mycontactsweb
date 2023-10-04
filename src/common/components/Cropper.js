import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { Field, Formik } from "formik";
import ImageCropFiled from "./DragNDrop/ImageCropperField";
const Cropper = () => {
  return (
    <div className="container">
      <Formik initialValues={{ cropper: "" }}>
        <Field name="cropper" isCrop component={ImageCropFiled} />
      </Formik>
    </div>
  );
};
export default Cropper;
