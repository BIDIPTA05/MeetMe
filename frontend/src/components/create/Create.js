import React, { useEffect, useState } from 'react';
import './create.css'
import { nanoid } from 'nanoid'
const Create = () => {
    const [code, setCode] = useState('')
    const [copy, setCopy] = useState('Copy')
    const [room, setRoom] = useState('6');
    const [confRoomSize, SetConfRoomSize] = useState('Set And Generate')
    useEffect(() => {
        const timer = setTimeout(() => {
            SetConfRoomSize('Set And Generate')
            setCopy('Copy');
        }, 3000);
        return () => clearTimeout(timer);
    }, [copy, confRoomSize])
    const handleInput = (e) => {
        setRoom(e.target.value);
    }
    const handleGenerate = () => {
        const uuid = nanoid(7) + room;
        setCode((uuid));
    }
    const handleSet = () => {
        if (room > 6 || room < 2) {
            alert('Enter Correct Room Size Otherwise It Will Set To Default Room Limit');
            setRoom(6);
        }
        else {
            handleGenerate();
            SetConfRoomSize('Done!')
        }
    }
    const handleCopy = () => {
        if (code) {
            /* Copy the text inside the text field */
            navigator.clipboard.writeText(code);
            setCopy("Copied")
        } else {
            setCopy("First Generate")
        }
    }
    return (
        <div className='create'>
            {/* <div className='generate'>
                <input type="text" value={code} disabled placeholder='Click Generate Button' />
                <button title='Click me to generate the code' onClick={handleGenerate}>Generate</button>
            </div>
            <div className='copyContainer'>
                <button onClick={handleCopy} title='Copy the code'>{copy}</button>
            </div> */}
            <div className='maxAllot'>
                <h4>Limit Members (Min: 2  Max: 6)</h4>
                <div className='maxAllot__set'>
                    <input type="text" value={room} onChange={handleInput} maxLength={1} min={2} max={6} />
                    <button onClick={handleSet}>{confRoomSize}</button>
                </div>
            </div>
            {/* <div className='maxAllot'>
                <h4>Limit Members (Min: 2  Max: 6)</h4>
                <div className='maxAllot__set'>
                    <input type="text" value={room} onChange={handleInput} maxLength={1} min={2} max={6} />
                    <button onClick={handleSet}>{confRoomSize}</button>
                </div>
            </div> */}
            <div className='generate'>
                <input type="text" value={code} disabled placeholder='Click Generate Button' />
                {/* <button title='Click me to generate the code' onClick={handleGenerate}>Generate</button> */}
                <button onClick={handleCopy} title='Copy the code'>{copy}</button>
            </div>
            <h3 className='info'>Click Join Section And Share Code To Your Mates</h3>

            {/* <div className='copyContainer'>
                <button onClick={handleCopy} title='Copy the code'>{copy}</button>
            </div> */}
            <p>*There is a limitation in Room <span>at max 6 members are allowed</span></p>
        </div>
    );
};

export default Create;
