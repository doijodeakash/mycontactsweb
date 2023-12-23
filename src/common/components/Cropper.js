// import React from "react";
import { Field, Formik } from 'formik'
import ImageCropFiled from './DragNDrop/ImageCropperField'

const Cropper = () => {
    return (
        <div className='container'>
            <Formik initialValues={{ cropper: '' }}>
                <Field name='cropper' isCrop component={ImageCropFiled} />
            </Formik>
        </div>
    )
}
export default Cropper
