import { NavLink, Link } from 'react-router-dom';
//Icons
import { IoIosArrowForward } from 'react-icons/io';
import { BsCamera2 } from 'react-icons/bs';
import { AiTwotonePushpin } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import { GiEyelashes } from 'react-icons/gi';


import logo from '../assets/camera_logo.png';

const isActiveStyles = "flex items-center gap-3 px-10 py-5 text-2xl font-extrabold text-black border-r-2 border-black shadow-lg transition-all duration-200 ease-in-out capitalize"

const isNotActiveStyles = "flex items-center px-5 gap-3 text-gray-500 font-bold py-2 px-4 rounded-lg shadow-lg hover:text-black transition-all duration-200 ease-in-out capitalize"

const Sidebar = ({ user, closeToggle }) => {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    }

    const categories = [
        {
            name: 'Discover',
            path: '/',
            icon: <BsCamera2 className="text-2xl text-black" />
        },
        {
            name: 'Pins',
            path: '/pins',
            icon: <AiTwotonePushpin className="text-2xl text-black" />
        },
        {
            name: 'Profile',
            path: '/user-profile',
            icon: <FaUserCircle className="text-2xl text-black" />
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: <CgLogOut className="text-2xl text-black" />
        },
        {
            name: 'Other',
            path: '/other',
            icon: <IoIosArrowForward className="text-2xl text-black " />
        }
    ]

    return (
        <div className="flex flex-col justify-between bg-gray-200 h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link to="/" className="flex justify-center px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseSidebar}>
                    <GiEyelashes className="w-16 text-black text-6xl" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink to="/" className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
                        <GiEyelashes className="text-black" />
                       VexHub
                    </NavLink>
                    {categories.slice(0, categories.length - 1).map(category => (
                        <NavLink
                            to={`category${category.path}`}
                            className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
                            key={category.name}
                            onClick={handleCloseSidebar}
                        >
                            {category.name} {category.icon}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
