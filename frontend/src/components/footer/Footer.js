import React from 'react';
import './footer.css'
import brandLogo from '../../images/brandLogo.png'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(res => {
            navigate('/');
            console.log('successfully logout')
        }).catch(err => console.log(err));
    }
    return (
        <div className='footer'>
            <div className='footer__left'>
                <img src={brandLogo} alt="MeetMe Logo" />
                <div className='footer__left--subpart'>
                    <h3>MeetMe</h3>
                    <a target="_blank" rel="noreferrer" href="https://www.instagram.com/phoenix_81_/">
                        Design And Developed By Phoenix
                    </a>
                </div>
            </div>
            <div className="footer__right">
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
};

export default Footer;
