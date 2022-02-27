import React, { useState, useEffect } from 'react';
import { MdDownloadOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';

import { MasonaryLayout, Spinner } from '.';


const PinDetail = ({ user }) => {

    const [pins, setPins] = useState(null);
    const [pinDetail, setPinDetail] = useState(null);
    const [comments, setComments] = useState(null);
    const [addingComment, setAddingComment] = useState(false);
    const { pinId } = useParams();

    if(!pinDetail) return <Spinner message="Loading details..." />;

    const fetchPinDetails = () => {
        let query = pinDetailQuery(pinId);
        client.fetch({ query })
            .then((data) => {
            setPinDetail(data[0]);
            if (data[0]) {
                query = pinDetailMorePinQuery(data[0]);
                client.fetch(query)
                .then(res => setPins(res))
            }
        });
    }



    return (
        <div>
            Detail
        </div>
    )
}

export default PinDetail;
