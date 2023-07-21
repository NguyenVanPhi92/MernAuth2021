import { useParams } from 'react-router-dom'
import './activatelayout.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

// MÀN HÌNH ACTIVE VERIFY TOKEN KHI USER REGISTER
// XÁC NHẬN KÍCH HOẠT TÀI KHOẢN
// SAU KHI USER XÁC NHẬN EMAIL THÌ CHUYỂN TỚI MÀN HÌNH LOGIN
const ActivateLayout = ({ history }) => {
    const params = useParams()
    console.log(params)
    const { activation_token } = useParams()

    useEffect(() => {
        // check token
        if (activation_token) {
            const activateUser = async () => {
                try {
                    const res = await axios.post('/api/auth/activation', {
                        activation_token
                    })
                    toast(res.data.msg, {
                        className: 'toast-success',
                        bodyClassName: 'toast-success'
                    })
                } catch (err) {
                    console.log(err)
                    toast(err.response.data.msg, {
                        className: 'toast-failed',
                        bodyClassName: 'toast-failed'
                    })
                }
            }
            activateUser()
        }
    }, [activation_token])

    const handleClick = () => {
        history.push('/')
    }

    return (
        <div className='activate'>
            <ToastContainer />
            <p>
                ready to login ? 👉🏻 <span onClick={handleClick}>Here</span>
            </p>
        </div>
    )
}

export default ActivateLayout
