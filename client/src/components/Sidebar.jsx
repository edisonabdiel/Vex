import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/camera_logo.png';

const isActiveStyles = {}

const isNotActiveStyles = "flex items-center px-5 gap-3 text-gray-500 font-bold py-2 px-4 rounded-lg shadow-lg hover:text-black transition-all duration-200"

const Sidebar = ({ user, closeToggle }) => {

    const handleCloseSidebar = () => {
        if(closeToggle) closeToggle(false);
     }

    return (
        <div className="flex flex-col justify-between bg-gray-300 h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 item-center " onClick={handleCloseSidebar}>
                <img src={logo} alt="logo" className="w-16" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink to="/" className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }>
                        <RiHomeFill className="text-black" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
