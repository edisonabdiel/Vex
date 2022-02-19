import { GiTravelDress, GiShinyPurse, GiBootStomp, Gi3DGlasses, GiHeartNecklace } from 'react-icons/gi';
const iconStyles = "text-2xl text-black"

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