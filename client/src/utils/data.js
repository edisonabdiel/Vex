import { GiTravelDress, GiShinyPurse, GiBootStomp, Gi3DGlasses, GiHeartNecklace } from 'react-icons/gi';
const iconStyles = "text-2xl text-black";

export const categories = [
  {
      name: 'Dresses',
      path: '/dresses',
      icon: <GiTravelDress className={iconStyles} />
  },
  {
      name: 'Purses',
      path: '/purses',
      icon: <GiShinyPurse className={iconStyles} />
  },
  {
      name: 'Shoes',
      path: '/shoes',
      icon: <GiBootStomp className={iconStyles} />
  },
  {
      name: 'Glasses',
      path: '/sunglasses',
      icon: <Gi3DGlasses className={iconStyles} />
  },
  {
      name: 'Other',
      path: '/other',
      icon: <GiHeartNecklace className={iconStyles} />
  }

]

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

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};