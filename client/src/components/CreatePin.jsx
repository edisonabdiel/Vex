import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { client } from '../client';
import Spinner from '../components/Spinner';

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

    const uplpoadImage = (e) => {
        const { type, name } = e.target.files[0];
        if (type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg' || type === 'image/gif' || type === 'image/svg', type === 'image/tiff') {
            setLoading(true);
            setWrongImageType(false);

            client.assets.upload('image', e.target.files[0], { contentType: type, fileName: name }).then(({ hash }) => {
                setImage(hash);
                setLoading(false);
            }).catch(err => {
                console.log('Image Upload error', err);
            });
        } else {
            setWrongImageType(true);
        }
    };


    return (
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            {fields && (
                <p className="text-red-500 mb-5 text-lx trnasition-all duration-150 easi-in">Please fill all the fields</p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-gray-200 rounded-md lg:p-5 p3 lg:w-4/5 w-full">
                <div className="bg-gray-300 p-3 flex flex-0.7 w-full rounded-md">
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
                                    <p className="mt-32 text-gray-400">Use high-quality JPG, SVG, PNG, GIF, TIFF less than 20MB </p>
                                </div>
                                <input
                                    type="file"
                                    name="upload-image"
                                    onChange={uplpoadImage}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <p>render something else</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePin;
