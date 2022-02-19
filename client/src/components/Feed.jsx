import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { searchQuery, feedQuery } from '../utils/data';

import { MasonaryLayout, Spinner } from './';

const Feed = () => {

    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();


    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);
            client.fetch(query)
                .then(res => {
                    setLoading(false);
                    setPins(res);
                })
        } else {
            client.fetch(feedQuery)
                .then(res => {
                    setLoading(false);
                    setPins(res);
                })
        }
    }, [categoryId])

    if (loading) {
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
