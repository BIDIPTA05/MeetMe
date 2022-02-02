import React, { useState } from 'react';
import './Join.css'
const Join = ({ username }) => {
    const [code, setCode] = useState('');
    const handleInput = (e) => {
        setCode(e.target.value);
    }
    const handleJoin = () => {
        if (code.length === 8) {
            console.log("Joined : ", code);
            window.location.assign(`http://localhost:5000/${code}&${username}`);
        } else {
            alert('Code Is Invalid, Check the Code or Create New')
            setCode('')
        }

    }
    return (
        <div className='join'>
            <h2>Join the Meeting</h2>
            <input type="text" placeholder='Enter Your Code' required name='code' value={code} onChange={handleInput} />
            <button onClick={handleJoin}> Click To Join</button>
        </div>
    );
};

export default Join;
