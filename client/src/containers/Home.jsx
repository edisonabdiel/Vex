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
import { fetchUser } from '../utils/fetchUser';

import logo from '../assets/camera_logo.png';

const Home = () => {

    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState(null);
    const scrollRef = useRef(null);

    console.log(user);

    const userInfo = fetchUser();


    useEffect(() => {
        const query = userQuery(userInfo?.googleId);

        client.fetch(query).then(res => setUser(res[0]));

    }, []);

    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        scrollRef.current.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="flex bg-gray md:flex-row flex-col h-screen transition-height duration-75 ease-out">
                <div className="hidden md:flex h-screen flex-initial">
                    <Sidebar user={user && user} />
                </div>
                <div className="flex md:hidden flex-row">
                    <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                        <HiMenu fontSize={40} className="cursor-pointer text-white" onClick={() => setToggleSidebar(true)} />
                        <Link to="/">
                            <img src={logo} alt="logo" className="w-28" />
                        </Link>
                        <Link to={`user-profile/${user?._id}`}>
                            <img src={user && user.image} alt="user-pic" className="w-9 h-9 rounded-full " />
                        </Link>
                    </div>
                    {toggleSidebar && (
                        <div className="fixed w-4/5 bg-gray h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                            <div className="absolute w-full flex justify-end items-center p-2">
                                <AiFillCloseCircle fontSize={30} className="cursor-pointer text-gray-900 text-2xl" onClick={() => setToggleSidebar(false)} />
                            </div>
                            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
                        </div>
                    )}
                </div>
                <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                    <Routes>
                        <Route path="/user-profile/:userId" element={<UserProfile />} />
                        <Route path="/*" element={<Pins user={user && user} />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Home;
