// Google login plugin
import GoogleLogin from 'react-google-login';
// DOM
import { useNavigate } from 'react-router-dom';
// Icons
import { FcGoogle } from 'react-icons/fc';
// Assets
import background_video from '../assets/background_video.mp4';
import camera_logo from '../assets/camera_logo.png';
// Sanity middleware
import { client } from '../client';

const Login = () => {

    const navigate = useNavigate();

    const resGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj));
        const {name, imageUrl, googleId } = response.profileObj;

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,

        };

        client.createIfNotExists(doc).then(() => {
            console.log('User created');
            navigate('/', { replace: true });
         });
    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    className="top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={background_video}
                    controls={false}
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay ">
                    <div className="p-5">
                        <img src={camera_logo} alt="camera_logo" className="w-24 h-24" />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            render={renderProps => (
                                <button
                                    type="button"
                                    onClick={renderProps.onClick}
                                    className="bg-mainColor flex justify-center items-center p-3 text-black font-bold py-2 px-4 rounded-lg shadow-lg"
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle className="w-4 h-4 mr-4" />
                                    Sign in with Google
                                </button>
                            )}
                            onSuccess={resGoogle}
                            onFailure={resGoogle}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
