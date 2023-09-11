import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO } from "../utils/constants";


const Header = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                navigate("/browse")
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/")
            }
        });

        // unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);


    return (
        <div className=' absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between'>
            <img className=' relative w-44'
                src={LOGO} alt="logo"
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