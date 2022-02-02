import React from 'react';
import './logout.css'
import roomFull from '../../images/roomFullAlert.png'
import Footer from '../../components/footer/Footer';
const Logout = ({ username }) => {
    return (
        <div className='logout'>
            <h1>Hi 👋 {username}</h1>
            <div className='roomFullAlert'>
                <img src={roomFull} alt="Room Full Icon" />
                <h2>The Room Is Full</h2>
            </div>
            <div className='note'>
                <h4><span className='try'>Try to join afterward</span> or <span className='code'>Entered code is wrong</span> </h4>
                <h4>Try to contact to admin/creator of this room</h4>
            </div>
            <Footer />
        </div>
    );
};

export default Logout;
