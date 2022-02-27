import { NavLink, Link } from 'react-router-dom';
//Icons
import { AiFillCaretDown } from 'react-icons/ai';
import { GiHeartburn } from 'react-icons/gi';
//Categories
import { categories } from '../utils/data';


const isActiveStyles = "flex items-center gap-3 px-10 py-5 text-2xl bg-gray-300 font-extrabold text-pink-700 border-r-4 rounded-lg border-black shadow-lg transition-all duration-200 ease-in-out capitalize"
const isNotActiveStyles = "flex items-center px-5 gap-3 text-gray-500 font-bold py-2 px-4 rounded-xl shadow-lg hover:text-black transition-all duration-200 ease-in-out capitalize"


const Sidebar = ({ user, closeToggle }) => {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    }

    return (
        <div className="flex flex-col justify-between bg-gray-200 p-2 mt-2 ml-2 overflow-y-scroll min-w-210 hide-scrollbar rounded-md">
            <div className="flex flex-col">
                <Link to="/" className="flex justify-center px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseSidebar}>
                    <GiHeartburn className="w-16 text-pink-700 text-8xl" />
                </Link>
                <div className="flex flex-col gap-5">
                    {/* {user && (
                        <NavLink to={`user-profile/${user._id}`} className="flex justify-center items-center my-5 mb-3 gap-2 text-black" onClick={handleCloseSidebar}>
                            <img src={user.image} alt="user" className="w-12 h-12 rounded-full " />
                        </NavLink>
                    )} */}
                    <h4 className="flex justify-center items-center text-black">Discover <AiFillCaretDown /></h4>
                    {categories.map((category, index) => (
                        <NavLink to={`category${category.path}`} key={index} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
                            <span className="evil-font text-xl capitalize">{category.name}</span>
                            {category.icon}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div style={{fontSize: '12px'}} className="flex flex-col justify-center items-center my-5 mb-2 gap-2 text-gray-500">
                <div>Developed by <span className="dev-name-font">EdisonAbdiel ™</span></div>
                <div>{new Date().getFullYear()}</div>
            </div>
        </div>
    )
}

export default Sidebar;
