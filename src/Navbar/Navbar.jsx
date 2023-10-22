import { useNavigate } from 'react-router-dom';
import "./Navbar.css"

function Navbar({ user, setUser}) {
    const navigate = useNavigate();
    const signout = () => {
        const userObj = {
            name: "",
            email: "",
            photoUrl: "",
        }
        setUser(userObj)
        navigate("/login")
    }
    return (
        <div className='navbar'>
            <div className='navbar__buttonContainer'>
                <button className='navbar__button' onClick={signout}>Sign Out</button>
            </div>
            <div className='navbar__imageContainer'>
                <img
                    src={user.photoUrl}
                    alt='user'
                    className='navbar__image'
                />
            </div>
        </div>
    )
}

export default Navbar