import { NavLink, Link } from 'react-router-dom';
//Icons
import { IoIosArrowForward } from 'react-icons/io';
import { BsCamera2 } from 'react-icons/bs';
import { AiTwotonePushpin } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import { GiTravelDress, GiShinyPurse, GiBallerinaShoes, GiEyelashes } from 'react-icons/gi';


const isActiveStyles = "flex items-center gap-3 px-10 py-5 text-2xl bg-gray-300 font-extrabold text-black border-r-2 border-black shadow-lg transition-all duration-200 ease-in-out capitalize"
const isNotActiveStyles = "flex items-center px-5 gap-3 text-gray-500 font-bold py-2 px-4 rounded-lg shadow-lg hover:text-black transition-all duration-200 ease-in-out capitalize"
const iconStyles = "text-2xl text-black"

const Sidebar = ({ user, closeToggle }) => {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    }


    const menuItems = [
        {
            name: 'Feed',
            path: '/',
            icon: <BsCamera2 className={iconStyles} />
        },
        {
            name: 'Pins',
            path: '/pins',
            icon: <AiTwotonePushpin className={iconStyles} />
        },
        {
            name: 'Profile',
            path: '/user-profile',
            icon: <FaUserCircle className={iconStyles} />
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: <CgLogOut className={iconStyles} />
        },
        {
            name: 'Other',
            path: '/other',
            icon: <IoIosArrowForward className="text-2xl text-black" />
        }
    ]

    const categories = [
        {
            name: 'Dresses',
            path: '/dresses',
            icon: <GiTravelDress className={iconStyles} />
        },
        {
            name: 'Purses',
            path: '/purses',
            icon: <GiShinyPurse className={iconStyles} />
        },
        {
            name: 'Shoes',
            path: '/shoes',
            icon: <GiBallerinaShoes className={iconStyles} />
        },



    ]

    return (
        <div className="flex flex-col justify-between bg-gray-200 h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link to="/" className="flex justify-center px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseSidebar}>
                    <GiEyelashes className="w-16 text-black text-6xl" />
                </Link>
                <div className="flex flex-col gap-5">
                {user && (
                <NavLink to={`user-profile/${user._id}`} className="flex justify-center items-center my-5 mb-3 gap-2 text-black" onClick={handleCloseSidebar}>
                    <img src={user.image} alt="user" className="w-12 h-12 rounded-full shadow-lg" />
                </NavLink>
            )}
                    {categories.map(category => (
                        <NavLink to={`category${category.path}`} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
                            {category.name}{category.icon}
                        </NavLink>
                    ))}
                    {menuItems.slice(0, menuItems.length - 1).map(menuItem => (
                        <NavLink
                            to={`category${menuItem.path}`}
                            className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
                            key={menuItem.name}
                            onClick={handleCloseSidebar}
                        >
                            {menuItem.name} {menuItem.icon}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center my-5 mb-2 gap-2 text-black text-sm">
                <div>Developed by EdisonAbdiel™</div>
                <div>{new Date().getFullYear()}</div>
            </div>
        </div>
    )
}

export default Sidebar;
