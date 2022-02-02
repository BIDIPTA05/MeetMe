import React from 'react';
import './SigIn.css'
import brandIcon from '../../images/brandLogo.png'

const SignIn = ({ handleSignIn }) => {

  return (
    <div className='signIn'>
      <div className='signIn__top'>
        <img src={brandIcon} alt="Meet-Me Icon" />
        <h3>Meet your Mate With MeetMe</h3>
        <h5>A Video Calling App That Connect You With Your Mates</h5>
      </div>
      <div className="signIn__bottom">
        <button onClick={() => { handleSignIn(); }}>Sign Up With Google</button>
        <footer>
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com/phoenix_81_/">
            Design And Developed By Phoenix
          </a>
        </footer>
      </div>
    </div>);
};

export default SignIn;

