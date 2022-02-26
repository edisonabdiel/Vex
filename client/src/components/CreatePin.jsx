import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { client } from '../client';
import Spinner from '../components/Spinner';

import { categories } from '../utils/data';

const CreatePin = ({ user }) => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState(false);
    const [category, setCategory] = useState(null);
    const [image, setImage] = useState(null);
    const [wrongImageType, setWrongImageType] = useState(false);

    const navigate = useNavigate();
    console.log(user._id)

    const uplpoadImage = (e) => {
        const { type, name } = e.target.files[0];
        if (type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg' || type === 'image/gif' || type === 'image/svg' || type === 'image/tiff') {
            setLoading(true);
            setWrongImageType(false);

            client.assets.upload('image', e.target.files[0], { contentType: type, fileName: name }).then((hash) => {
                setImage(hash);
                setLoading(false);
            }).catch(err => {
                console.log('Image Upload error', err);
            });
        } else {
            setWrongImageType(true);
        }
    };

    const savePin = () => {
        if (title && about && destination && category && image?._id) {
            const doc = {
                _type: 'pin',
                title,
                about,
                destination,
                category,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'refence',
                        _ref: image._id
                    }
                },
                userId: user._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id
                }
            };

            client.create(doc).then(() => {
                navigate('/');
            })
        } else {
            setFields(true);
            setTimeout(() => {
                setFields(false);
            }, 3000);

        }
    }
    return (
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            {fields && (
                <p className="text-red-500 mb-5 text-2xl transition-all duration-150 ease-in">Please fill all the fields</p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-gray-200 rounded-md lg:p-5 p3 lg:w-4/5 w-full">
                <div className="bg-gray-300 p-3 flex flex-0.7 w-full rounded-md shadow-md shadow-black/40">
                    <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-700 p3 w-full h-420">
                        {loading && (<Spinner />)}
                        {wrongImageType && (<p className="text-red-500 mb-5 text-lx trnasition-all duration-150 easi-in">Wrong imgege type</p>)}
                        {!image ? (
                            <label>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="font-bold text-5xl">
                                            <AiOutlineCloudUpload className="text-gray-700" />
                                        </p>
                                        <p className="text-lg text-gray-700">Click to upload</p>
                                    </div>
                                    <p className="flex justify-center mt-32 mx-12 text-gray-400 items-center">Use high-quality JPG, SVG, PNG, GIF, TIFF less than 20MB</p>
                                </div>
                                <input
                                    type="file"
                                    name="upload-image"
                                    onChange={uplpoadImage}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="relative h-full">
                                <img src={image?.url} alt="uploaded-pic" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 rounded-full bg-white text-3xl cursor-pointer outline-none shadow-md transition-all duration-500 ease-in-out"
                                    onClick={() => {
                                        setImage(null);
                                    }}
                                >
                                    <MdDelete className="text-red-600 m-1" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5">
                    <input
                        type="text"
                        value={title}
                        onChange={(e => setTitle(e.target.value))}
                        placeholder="Add your title here"
                        className="outline-none text-xl text-gray-600 border-b-2 rounded-md shadow-md shadow-black/40 font-bold border-gray-400 p-2 w-full bg-gray-300"
                    />
                    <input
                        type="text"
                        value={about}
                        onChange={(e => setAbout(e.target.value))}
                        placeholder="Describe your fashion item"
                        className="outline-none text-xl text-gray-600 border-b-2 rounded-md shadow-md shadow-black/40 font-bold border-gray-400 p-2 w-full bg-gray-300"
                    />
                    <input
                        type="text"
                        value={destination}
                        onChange={(e => setDestination(e.target.value))}
                        placeholder="Add a link to the fashion item"
                        className="outline-none text-xl text-gray-600 border-b-2 rounded-md shadow-md shadow-black/40 font-bold border-gray-400 p-2 w-full bg-gray-300"
                    />
                    <div className="flex flex-col">
                        <div>
                            <p className="font-semibold mb-2 text-lg sm:text-xl text-gray-400">Choose your item's category</p>
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                className="outline-none w-4/5 text-base text-gray-600 p-2 rounded-md shadow-md shadow-black/40 border-gray-400 p-2 bg-gray-300 cursor-pointer"
                            >
                                <option vlaue="other" className="bg-gray-200">Select a Category</option>
                               
                                    {categories?.map((category, index) => (
                                        <option
                                            key={index}
                                            value={category.name}
                                            className="bg-gray-200 text-base border-0 outline-none capitalize text-gray-600"
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex justify-end item-end mt-5">
                            <button type="button"
                                onClick={savePin}
                                className="bg-green-500 text-gray-100 font-bold py-2 px-4 rounded-md shadow-md shadow-black/40">
                                Save
                            </button>
                        </div>
                    </div>
                    {user && (
                        <div className="flex items-center justify-center my-2 gap-2">
                            <img
                                src={user?.image}
                                alt="profile-pic"
                                className="rounded-full w-10 h-10 mr-2 shadow-md shadow-black/40"
                            />
                            <p className="text-gray-500 font-bold dev-name-font">{user?.userName}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreatePin;
