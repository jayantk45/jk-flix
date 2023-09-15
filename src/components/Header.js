import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                navigate("/error");
            });
    };

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
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });

        // unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    const handleGptSearchClick = () => {
        // Toggle GPT search
        dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    };

    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    return (
        <div className=" absolute w-full px-8 py-2 bg-gradient-to-b from-black z-20 flex flex-col md:flex-row md:justify-between ">
            <img className=" relative w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

            {user && (
                <div className=" flex gap-x-4 justify-between">

                    {showGptSearch && (
                        <select className=" p-2 my-6 md:my-5 bg-gray-300 rounded-lg text-black" onChange={handleLanguageChange}>
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.identifier} value={lang.identifier}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <button
                        className=" px-5 md:px-10 py-1 md:py-3 mx-5 my-4 bg-purple-800 text-white text-lg rounded-lg  hover:bg-purple-700"
                        onClick={handleGptSearchClick}
                    >
                        {showGptSearch ? ("Home") : ("GPT Search")}
                    </button>

                    <div className=" flex gap-x-4  font-bold bg-slate-800 px-5 my-2 rounded-lg  hover:bg-slate-700">
                        <img className=" hidden md:block w-12 h-12 my-3" src={user?.photoURL} alt="user-icon" />
                        <button onClick={handleSignOut} className=" text-white text-sm md:text-lg">
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
