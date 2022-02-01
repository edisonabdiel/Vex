import React from 'react';
import { Hearts } from 'react-loader-spinner';

const Spinner = ({ message }) => (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <Hearts
            type="Hearts"
            color="#be185d"
            height={100}
            width={100}
            className="m-5"
        />
        <p className="text-lg text-center px-2">{message}</p>
    </div>
);

export default Spinner;
