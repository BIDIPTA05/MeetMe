import React, { useState } from 'react';
import Create from '../../components/create/Create';
import Footer from '../../components/footer/Footer';
import Join from '../../components/join/Join';
import './CreateJoin.css'
const CreateJoin = ({ username }) => {
    // console.log(username);
    const [create, setCreate] = useState(false);
    const handleCreate = () => {
        setCreate(true);
    }
    const handleJoin = () => {
        setCreate(false);
    }

    return (
        <div className='options'>
            <div className='createJoin'>
                <h1>Hi 👋 {username}</h1>
                <div className='createJoin__btnCollection'>
                    <button className='createBtn' style={!create ? { backgroundColor: '#504e4e' } : { backgroundColor: '#5986fa' }} onClick={handleCreate}>Create</button>
                    <button className='joinBtn' style={create ? { backgroundColor: '#504e4e' } : { backgroundColor: '#5986fa' }} onClick={handleJoin}>Join</button>
                </div>
                {
                    create ? (
                        <Create />
                    ) : (
                        <Join username={username} />
                    )
                }
            </div>
            <Footer />
        </div>
    );
};

export default CreateJoin;
