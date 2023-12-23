import { Label } from 'reactstrap'
import { ErrorMessage, getIn } from 'formik'
import { useEffect, useState } from 'react'

const FormikImage = (props) => {
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState('')
    const {
        field: { name },
        form: { setFieldValue, values, errors }
    } = props

    const errorMessage = getIn(errors, name)
    // const isTouched = getIn(touched, name);

    const renderError = () => {
        return <p className='error-msg'>{errorMessage}</p>
    }

    const getBase64 = (files) => {
        return new Promise((resolve) => {
            let baseURL = ''
            // Make new FileReader
            const reader = new FileReader()

            // Convert the file to base64 text
            reader.readAsDataURL(files)

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                // console.log("Called", reader);
                baseURL = reader.result

                resolve(baseURL)
            }
        })
    }

    const handleFile = async (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
        const files = e.target.files[0]
        const base64 = await getBase64(files)
        setFieldValue(name, base64)
    }

    useEffect(() => {
        setFieldValue('file', file)
        setFieldValue('fileName', fileName)
    }, [file, fileName])

    return (
        <div className='input-image'>
            {values[name] ? (
                <>
                    <img src={values[name]} alt='img' className='input-img' />
                    <div
                        role='presentation'
                        className='img-close'
                        onClick={() => setFieldValue(name, '')}
                    >
                        <span role='presentation'>
                            <i
                                style={{ color: 'red', height: 35, width: 35 }}
                                className='bi bi-trash input-trash'
                            />
                        </span>
                    </div>
                </>
            ) : (
                <div className='input-container flex-row'>
                    <input
                        type='file'
                        onChange={handleFile}
                        name='file'
                        id='file'
                        className='inputfile'
                    />
                    <Label className='m-0' for='file'>
                        Upload Image
                    </Label>
                    <ErrorMessage name={name} render={renderError} />
                </div>
                // <input type="file" onChange={handleFile} />
            )}
        </div>
    )
}

export default FormikImage
