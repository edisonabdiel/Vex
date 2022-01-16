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

import logo from '../assets/camera_logo.png';

const Home = () => {
    return (
        <>
            <div className="flex md:flex-row h-screen transaction-height duration ease-out">
                <div className="hidden md:flex h-screen flex-col">

                </div>
            </div>
        </>
    )
}

export default Home;
