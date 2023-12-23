import { Button, Col, Label } from 'reactstrap'
import { ErrorMessage, getIn } from 'formik'
import { useEffect, useState } from 'react'
import ReactCrop from 'react-image-crop'

const ImageCropFiled = (props) => {
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState('')
    const [image, setImage] = useState()
    const [crop, setCrop] = useState({ aspect: 16 / 9 })
    const [result, setResult] = useState()
    const {
        field: { name },
        form: { setFieldValue, values, errors },
        isCrop
    } = props

    const errorMessage = getIn(errors, name)

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

    const getCroppedImg = () => {
        const canvas = document.createElement('canvas')
        const scaleX = 1 //image.x / image.width;
        const scaleY = 1 //image.y / image.height;
        console.log('image', image)
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = values[name]
        try {
            ctx.drawImage(
                img,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            )
        } catch (err) {
            console.log('errrrrrrr-----', err)
        }

        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg', 2)
        setResult(base64Image)

        // As a blob
        // return new Promise((resolve, reject) => {
        //   canvas.toBlob(
        //     (blob) => {
        //       blob.name = fileName;
        //       resolve(blob);
        //     },
        //     "image/jpeg",
        //     1
        //   );
        // });
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center'>
                <Col className='d-flex'>
                    <div className='input-image'>
                        {values[name] ? (
                            <>
                                {isCrop ? (
                                    <ReactCrop
                                        onImageLoaded={setImage}
                                        onChange={setCrop}
                                        crop={crop}
                                        onComplete={(setImage, getCroppedImg)}
                                    >
                                        <img alt='' className='input-image' src={values[name]} />
                                    </ReactCrop>
                                ) : (
                                    <img alt='' src={values[name]} />
                                )}
                                <div
                                    role='presentation'
                                    className='img-close'
                                    onClick={() => setFieldValue(name, '')}
                                >
                                    <span>
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
                </Col>
                {result && values[name] && (
                    <Col className='d-flex align-items-center justify-content-center'>
                        <div className='d-inline input-image'>
                            {result && <img src={result || ''} alt='img' />}
                        </div>
                    </Col>
                )}
            </div>
            <div className='d-flex flex-row justify-content-evenly position-bottom'>
                {result && values[name] && (
                    <div className='m-1'>
                        <Button className='btn btn-danger' onClick={getCroppedImg}>
                            Crop
                        </Button>
                    </div>
                )}
                {result && values[name] && (
                    <div className='m-1'>
                        <Button
                            onClick={() => {
                                setResult('')
                                setCrop({})
                                setImage({})
                            }}
                            color='danger'
                            outline
                        >
                            Reset Crop
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageCropFiled
