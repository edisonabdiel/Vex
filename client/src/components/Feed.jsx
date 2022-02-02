import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { searchQuery, feedQuery } from '../utils/data';

import { MasonaryLayout, Spinner } from './';

const Feed = () => {

    const [loding, setLoding] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();


    useEffect(() => {
        if (categoryId) {
            setLoding(true);
            const query = searchQuery(categoryId);
            client.fetch(query)
                .then(res => {
                    setLoding(false);
                    setPins(res);
                })
        } else {
            client.fetch(feedQuery)
                .then(res => {
                    setLoding(false);
                    setPins(res);
                })
        }
    }, [categoryId])

    if (loding) {
        return <Spinner message={"We're adding new ideas to your feed!"} />
    }

    return (
        <div>
            {pins &&
                <MasonaryLayout pins={pins} />}
        </div>
    )
}

export default Feed;
