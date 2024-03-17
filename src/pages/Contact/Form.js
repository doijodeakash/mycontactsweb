import { Field, Formik } from 'formik'
import * as Yup from 'yup'
// import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
    // Modal,
    ModalHeader,
    // ModalBody,
    // ModalFooter,
    Card,
    Row,
    Button,
    Col
} from 'reactstrap'
import TextField from 'src/common/components/TextField'
import { CreateContact, UpdateContact, UserDetails } from 'src/store/actions'
import { useLocation, useNavigate } from 'react-router-dom'
import FormikImage from 'src/common/components/FormikImage'
// import ReCAPTCHA from 'react-google-recaptcha'

const ContactForm = () => {
    // const [RCToken, setRCToken] = useState("");
    // const ReCaptchaRef = useRef(null)
    const {
        state: { data, index }
    } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const user = JSON.parse(localStorage.getItem("user"));

    const validateForm = Yup.object({
        name: Yup.string().required('Name is required field'),
        email: Yup.string().required('E-mail is required field'),
        phone: Yup.string().required('Phone is required field'),
        //img: Yup.string().required('Image is required field')
    })

    const saveContact = async (values) => {
        // const token = await ReCaptchaRef.current.executeAsync()
        // console.log('tokens', token)
        // setRCToken(token);

        if (!token) {
            return
        }

        const fd = new FormData()
        // console.log('ReCaptchaRef --->', ReCaptchaRef)
        try {
            let res
            const params = {
                id: (data && data[index]?.id) || 0,
                name: values.name,
                email: values.email,
                phone: values.phone,
                // img: values.img
            }
            if (params.id) {
                fd.append('id', params.id)
                fd.append('name', values?.name)
                fd.append('email', values?.email)
                fd.append('phone', values?.phone)
                // fd.append('file', values?.file)
                res = await dispatch(UpdateContact(fd)).unwrap()
            } else {
                fd.append('name', values?.name)
                fd.append('email', values?.email)
                fd.append('phone', values?.phone)
                // fd.append('file', values?.file)
                res = await dispatch(CreateContact(fd)).unwrap()
            }
            console.log(res)
            dispatch(UserDetails())
            navigate('/contacts')
        } catch (err) {
            console.log('errrr', err)
        }
        // ReCaptchaRef.current.reset();
    }
    // const onChange = (value) => {
        // setRCToken(value);
        // console.log('recaptcha value:', value)
    // }
    // useEffect(() => {
    //   // dispatch(UserDetails());
    //   ReCaptchaRef.current.executeAsync();
    // }, []);
    // const grecaptchaObject = window.grecaptcha
    // console.log('ReCaptchaRef Token--->', ReCaptchaRef, grecaptchaObject)

    return (
        <div className='d-flex justify-content-center m-4'>
            <Row className='shadow-lg p-3 mb-5 bg-white rounded'>
                <Col>
                    <ModalHeader>
                        <p className='h5'>New Contact</p>
                    </ModalHeader>
                    {/* <ModalBody> */}
                    <Formik
                        initialValues={{
                            name: (data && data[index]?.name) || '',
                            email: (data && data[index]?.email) || '',
                            phone: (data && data[index]?.phone) || '',
                            img: (data && data[index]?.imgPath) || ''
                        }}
                        validationSchema={validateForm}
                        onSubmit={(values) => saveContact(values)}
                    >
                        {({ status, values, handleSubmit }) => {
                            console.log('form--Values', values)
                            return (
                                <Card className='card border-0'>
                                    <Row>
                                        <Col className='contact-form'>
                                            <Field
                                                name='name'
                                                type='text'
                                                component={TextField}
                                                placeholder='Name'
                                                className='form-control'
                                            />
                                            <Field
                                                name='email'
                                                component={TextField}
                                                type='email'
                                                placeholder='Email'
                                                className='form-control'
                                            />
                                            <Field
                                                name='phone'
                                                type='number'
                                                component={TextField}
                                                placeholder='Phone'
                                                className='form-control'
                                            />
                                            <Field name='img' component={FormikImage} />

                                            <Button
                                                color='primary'
                                                onClick={handleSubmit}
                                                disabled={status}
                                                title='Save'
                                                className='input-btn'
                                            >
                                                Save
                                            </Button>
                                            {/* <ReCAPTCHA
                                                type='image'
                                                theme='dark'
                                                // sitekey={"6Lf6HH4oAAAAAKl7WDdG5Yt6v6yJFS7FVDVTFH1j"} // v3 site key
                                                sitekey='6Lf7T34oAAAAALPL19FkTz3SaQd1fFqu40ztPoOX' //  V2 site key
                                                size='invisible'
                                                // badge="inline"
                                                grecaptcha={grecaptchaObject}
                                                onChange={onChange}
                                                ref={ReCaptchaRef}
                                            /> */}
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        }}
                    </Formik>

                    {/* </ModalBody> */}
                    {/* <ModalFooter></ModalFooter> */}
                </Col>
            </Row>
        </div>
    )
}

export default ContactForm
