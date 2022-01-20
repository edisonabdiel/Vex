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
    const [user, setUser] = useState(null);

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
                    <Sidebar user={user && user}/>
                </div>
                <div className="flex md:hidden flex-row">
                    <HiMenu fontSize={40} className="cursor-pointer text-white" onClick={() => setToggleSidebar(true)} />
                    <Link to="/">
                        <img src={logo} alt="logo" className="h-12 w-12" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="user" className="h-12 w-12" />
                    </Link>
                    {toggleSidebar && (
                        <div className="fixed w-4/5 h-screen bg-white overflow-y-auto shadow-md z-10 animate-slide-in">
                            <div className="absolute w-full flex justify-end items-center p-2">
                                <AiFillCloseCircle fontSize={40} className="cursor-pointer text-black text-2xl animate-bounce" onClick={() => setToggleSidebar(false)} />
                            </div>
                            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;
