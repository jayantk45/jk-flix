import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { BG_URL, USER_AVATAR } from "../utils/constants"
import Footer from "./Footer";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);


    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        // sign In & Sign up logic to be visible on firebase dashboard

        if (!isSignInForm) {
            // Sign Up logic (firebase code with some modifications)
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: USER_AVATAR
                    })
                        .then(() => {
                            // Profile updated!
                        })
                        .catch((error) => {
                            // An error occurred
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            // Sign in logic (firebase code with some modifications)
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div>
            <Header></Header>

            <div className=" absolute ">
                <img className=" h-screen object-cover md:w-screen"
                    src={BG_URL}
                    alt="bg"
                />
            </div>

            <form
                onSubmit={(e) => e.preventDefault()}
                className=" relative mx-auto right-0 left-0 top-36 md:top-[7rem] w-[90%] md:w-3/12 px-7 md:px-8 md:py-0 bg-black text-white rounded-lg bg-opacity-80"
            >
                <h1 className=" font-bold text-3xl md:text-4xl py-7 md:py-8 text-white">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className=" p-[1.5rem] md:p-4 my-2 md:my-4 w-full bg-gray-700"
                    />
                )}

                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className=" p-[1.5rem] md:p-4 my-4 w-full bg-gray-700"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className=" p-[1.5rem] md:p-4 my-4 w-full bg-gray-700"
                />

                <p className=" text-red-600">{errorMessage}</p>

                <button
                    className=" py-4 md:py-4 my-3 md:my-6 bg-red-700 text-white w-full rounded-lg"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <div className=" py-4 md:py-5 " onClick={toggleSignInForm}>
                    {isSignInForm ? (
                        <p className=" text-gray-500 ">
                            New to Netflix?{" "}
                            <span className="text-white  cursor-pointer underline">Sign Up</span> Now
                        </p>
                    ) : (
                        <p className=" text-gray-500 ">
                            Already registered?{" "}
                            <span className=" text-white  cursor-pointer underline">Sign In</span> Now
                        </p>
                    )}
                </div>
            </form>

            <Footer></Footer>

        </div>
    );
};

export default Login;
