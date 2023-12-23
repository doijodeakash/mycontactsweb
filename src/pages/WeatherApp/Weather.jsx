import { useState } from 'react'
import { Formik, Field } from 'formik'
import { Button } from 'reactstrap'
import TextField from 'src/common/components/TextField'
import './weatherApp.scss'
import axios from 'axios'
import wind from '../../assets/images/wind.png'
import humidity from '../../assets/images/humidity.png'
// import cloudIcon from '../../assets/images/cloud.png'
import clearIcon from '../../assets/images/clear.png'
import drizzleIcon from '../../assets/images/drizzle.png'
import rainIcon from '../../assets/images/rain.png'
import snowIcon from '../../assets/images/snow.png'

// import _ from "lodash";
import { toast } from 'react-toastify'

const WeatherApp = () => {
    const [cloudIcon, setCloudIcon] = useState(clearIcon)
    const API_KEY = '02d5f3a8286a702315aae176af511f24'
    const [hide, setHide] = useState(true)
    const [weather, setWeather] = useState({
        humidity: '',
        wind: '',
        temp: '',
        location: ''
    })
    const getWeather = async (values, formikBag) => {
        // const { setFieldError } = formikBag;
        setHide(true)
        console.log('Weather--values', values, formikBag)

        const response = await axios
            .get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: values.search,
                    lang: 'en',
                    appid: API_KEY,
                    units: 'Metric'
                }
            })
            .then(({ data }) => data)
            .catch((err) => {
                const {
                    response: { data }
                } = err
                console.log('getWeather---->err---->', data)
                // setFieldError("search", data?.message);
                toast(data?.message, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                })
            })

        setWeather({
            humidity: response?.main?.humidity || '',
            location: response?.name || '',
            temp: response?.main?.temp || '',
            wind: response?.wind?.speed || ''
        })
        setHide(false)
        getWeatherImage(weather?.weather[0].icon || '')
    }

    const getWeatherImage = (icon) => {
        // weather[0].icon;
        switch (icon) {
            case '01d' || '01n':
                return setCloudIcon(clearIcon)
            case '02d' || '02n':
                return setCloudIcon(cloudIcon)
            case '03d' || '03n':
                return setCloudIcon(drizzleIcon)
            case '04d' || '04n':
                return setCloudIcon(drizzleIcon)
            case '09d' || '09n':
                return setCloudIcon(rainIcon)
            case '10d' || '10n':
                return setCloudIcon(rainIcon)
            case '13d' || '13n':
                return setCloudIcon(snowIcon)
            default:
                return setCloudIcon(clearIcon)
        }
    }

    return (
        <Formik
            initialValues={{
                search: ''
            }}
            onSubmit={(values, formikBag) => getWeather(values, formikBag)}
        >
            {({ handleSubmit, values }) => {
                console.log('Weather--values', values)
                return (
                    <div className='weather-container-app'>
                        <div className='weather-field'>
                            <Field name='search' component={TextField} type='text' />

                            <Button
                                color='success'
                                className='btn-search-weather'
                                onClick={handleSubmit}
                            >
                                <i
                                    style={{ color: '#000', height: 35, width: 35 }}
                                    className='bi bi-search input-trash'
                                />
                            </Button>
                        </div>

                        {!hide && (
                            <>
                                <div className='weather-image'>
                                    <img src={cloudIcon} alt='wind' />
                                </div>
                                <div className='weather-temp'>
                                    {weather.temp ? `${weather.temp} ' °C'` : '24°C'}
                                </div>
                                <div className='weather-location'>
                                    {weather.location ? weather.location : 'London'}
                                </div>
                                <div className='data-container'>
                                    <div className='element'>
                                        <img src={humidity} alt='humidity' className='icon' />
                                        <div className='data'>
                                            <div className='humidity-percent'>
                                                {weather.humidity ? weather.humidity : '64%'}
                                            </div>
                                            <div className='text'>Humidity</div>
                                        </div>
                                    </div>
                                    <div className='element'>
                                        <img src={wind} alt='wind' className='icon' />
                                        <div className='data'>
                                            <div className='humidity-percent'>
                                                {weather.wind ? weather.wind : '18 km/h'}
                                            </div>
                                            <div className='text'>Wind Speed</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )
            }}
        </Formik>
    )
}

export default WeatherApp
