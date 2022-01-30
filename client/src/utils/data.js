export const userQuery = (userId) => {
    const query = `*[_type == 'user' && _id == '${userId}']`;
    return query;
};

export const searchQuery = (searchTerm) => {
    const query = `*[_type == 'pin' && match(title, '${searchTerm}*') || match(category, '${searchTerm}*') || match(about, '${searchTerm}*')]{
        image{
            asset->{
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`;
    return query;
};

export const feedQuery = `*[_type == 'pin'] | order(createdAt desc) {
    image{
        asset->{
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`;