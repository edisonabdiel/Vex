import React from 'react';
import Masonry from 'react-masonry-css';
import { Pin } from './'

const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1
};

const MasonaryLayout = ({pins}) => {
    return (
        <div>
            <Masonry
                breakpointCols={breakpointObj}
                className="flex animate-slide-fwd animate-fade-in"
            >
                {pins.map(pin => (
                    <Pin key={pin._id} pin={pin} />
              ))}
            </Masonry>
            
        </div>
    )
}

export default MasonaryLayout;
