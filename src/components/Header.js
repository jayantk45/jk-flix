import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }


    return (
        <div className=' absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between'>
            <img className=' relative w-44'
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"
            />

            {user &&
                <div className=' flex gap-4'>
                    <img className='h-12 my-3'
                        src={user?.photoURL} alt="user-icon"
                    />
                    <button onClick={handleSignOut} className=' text-lg font-bold text-white'>(Sign Out)</button>
                </div>
            }
        </div>
    );
};

export default Header