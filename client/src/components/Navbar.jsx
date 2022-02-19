import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {

    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className="flex gap-2 md:gap-5 w-full m-2 ">
            <Link to="/" className="mt-4">
            <h3 className="flex justify-start items-center text-black font-extrabold text-xl style-font mx-2 ">
                <span className="evil-font text-4xl">Evil</span>
                <span className="text-pink-700">Style</span>
            </h3>
            </Link>
            <div className="flex justify-end items-center w-full p-1 rounded-md border-none outline-none focus-within:shadow-lg">
                <IoMdSearch fontSize={28} className="m-2 text-black font-extrabold" />
                <input
                    type="text"
                    className="w-50 p-1.5 shadow-md shadow-black/40 text-lg text-gray-600 border-none outline-none font-extrabold rounded-md"
                    placeholder="Search"
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex justify-end items-center mx-4 gap-3">
                    {user && (
                        <Link
                            to={`user-profile/${user?._id}`}
                            className="m-2 gap-2 hidden md:block"
                        >
                            <img src={user.image} alt="user" className="w-12 h-12 shadow-md shadow-black/60 rounded-full" />

                        </Link>
                    )}
                </div>
                    <Link to="/create-pin" className="bg-gray-800 rounded-md shadow-md shadow-black/40 w-50 h-50 mr-4 hover:animate-ping">
                        <IoIosAdd className="text-2xl text-cyan-600 font-extrabold w-8 h-8" />
                    </Link>
            </div>
        </div>
    )
}

export default Navbar;
