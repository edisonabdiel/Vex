import { useState, useRef, useEffect } from 'react';
//Icons
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
// Router
import { Link, Route, Routes } from 'react-router-dom';
//Custom components
import { UserProfile, Sidebar } from '../components';
import Pins from './Pins';

import { client } from '../client';

import { userQuery } from '../utils/data';

import logo from '../assets/camera_logo.png';

const Home = () => {

    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState();

    console.log(user);
    
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;


    useEffect(() => {
        const query = userQuery(userInfo?.googleId);

        client.fetch(query).then(res => setUser(res[0]));

    }, []);


    return (
        <>
            <div className="flex md:flex-row h-screen transaction-height duration ease-out">
                <div className="hidden md:flex h-screen flex-initial">
                    <Sidebar />
                </div>
                <div className="flex md:hidden flex-row">
                    <HiMenu fontSize={40} className="cursor-pointer text-white" onClick={() => setToggleSidebar(false)} />
                    <Link to="/">
                        <img src={logo} alt="logo" className="h-12 w-12" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="user" className="h-12 w-12" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;
