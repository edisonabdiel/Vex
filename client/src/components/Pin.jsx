import { client, urlFor } from "../client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";


import { fetchUser } from '../utils/fetchUser';


const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
    const navigate = useNavigate();

    const [postHovered, setPostHovered] = useState(false);




    const user = fetchUser();

    const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user?.googleId))?.length;

    const savePin = (id) => {
        if (!alreadySaved && user) {
            client.patch(id).setIfMissing({ save: [] }).insert('after', 'save[-1]',
                [{
                    _key: uuidv4(),
                    userId: user?.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?.googleId
                    },
                }]).commit().then(() => {
                    window.location.reload();
                });
        }
    };


    return (
        <div className="m-1">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img className="rounded-lg w-full" alt="post" src={urlFor(image).width(250).url()} />
                {postHovered && (
                    <div
                        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pr-2 pb-2 z-50"
                        style={{ height: '100%' }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-gray-900 text-4xl opacity-50 hover:opacity-75"
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button
                                    type="button"
                                    className="text-black font-extrabold text-base p-2 rounded-3xl text-2xl bg-green-500 opacity-50 hover:opacity-75 cursor-pointer hover:shadow-lg"
                                >
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }
                                    }
                                    type="button"
                                    className="text-black font-extrabold text-base px-5 py-1 rounded-3xl text-2xl bg-green-500 opacity-50 hover:opacity-75 cursor-pointer hover:shadow-lg"
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        <div className="flex items-center justify-between gap-2 w-full">
                            {destination && (
                                <a
                                    href={destination}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-white text-sm rounded-full flex items-center text-gray-900 p-2 pl-4 pr-4 font-extrabold opacity-50 hover:opacity-75 cursor-pointer hover:shadow-lg"
                                >
                                    <BsFillArrowUpRightCircleFill className="w-6 h-6 mr-2 text-black" />
                                    {destination.length > 20 ? destination.slice(8, 30) : destination.slice(8)}
                                </a>
                            )}
                            {postedBy?._id === user?.googleId && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        client.delete(`${_id}`)
                                            .commit()
                                            .then(() => {
                                                window.location.reload();
                                            });
                                    }}
                                    className="text-black font-extrabold text-base px-5 py-1 rounded-full text-xl bg-red-500 opacity-50 hover:opacity-75 cursor-pointer hover:shadow-lg"
                                >
                                    <AiTwotoneDelete className="w-6 h-6 text-black" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`user-profile/${user?._id}`} className="flex gap-2 items-center mt-2">
                <img
                    className="rounded-full w-8 h-8 object-cover"
                    src={postedBy?.image}
                    alt="user"
                />
                <p className="font-semibold capitalize text-gray-200 dev-name-font">{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin;
