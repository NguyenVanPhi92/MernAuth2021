import { BiBookContent } from 'react-icons/bi'
import { BiUserCircle } from 'react-icons/bi'
import { BiLogOut } from 'react-icons/bi'
import axios from 'axios'
import './sidebar.css'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { GoogleLogout } from 'react-google-login'

const Sidebar = () => {
    const { dispatch } = useContext(AuthContext)

    // logout
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.get('/api/auth/signout')
            localStorage.removeItem('_appSignging')
            dispatch({ type: 'SIGNOUT' })
        } catch (err) {
            console.log(err)
        }
    }

    const logout = () => {
        console.log('logout success')
    }

    return (
        <div className='sidebar'>
            <div className='sidebar_menu'>
                <ul>
                    <li>
                        <BiBookContent />
                        <p>feed</p>
                    </li>
                    <li>
                        <BiUserCircle />
                        <p>profile</p>
                    </li>
                    <li onClick={handleClick}>
                        <BiLogOut />
                        <p>logout</p>
                    </li>

                    <li onClick={handleClick}>
                        <GoogleLogout
                            clientId={process.env.REACT_APP_G_CLIENT_ID}
                            buttonText='Logout'
                            onLogoutSuccess={logout}
                        ></GoogleLogout>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
