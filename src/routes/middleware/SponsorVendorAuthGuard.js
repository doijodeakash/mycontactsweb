import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const SponsorVendorAuthGuard = (props) => {
    const { isAuth, loading } = useSelector((state) => state.Login)

    // useEffect(() => {
    //     if (!isAuth && !loading) {
    //         navigate('/login')
    //     }
    // }, [isAuth, loading, navigate])
    if (!isAuth && !loading) {
        return <Navigate to={{ pathname: '/login' }} />
    }
    return props.children
}

export default SponsorVendorAuthGuard
