import React, { useEffect, useState } from 'react';
import SignIn from './layout/signIn/SignIn';
import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import CreateJoin from './layout/create_join/CreateJoin';
import { auth } from './firebase';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import Logout from './layout/logout/Logout';
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (location.pathname === '/logout') {
        setUsername(user.displayName);
        navigate('/logout');
      }
      else if (user) {
        setUsername(user.displayName);
        navigate('/createorjoin');
      }
      else {
        setUsername('');
        navigate('/');
        console.log('signout')
      };
    })
    return () => {
      unsubscribe();
    };
  }, [setUsername, navigate, location.pathname]);
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .catch(err => console.log(err));
  }
  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignIn handleSignIn={handleSignIn} />} />
        <Route exact path="/createorjoin" element={<CreateJoin username={username} />} />
        <Route exact path="/logout" element={<Logout username={username} />} />
      </Routes>

    </>
  )
};

export default App;
