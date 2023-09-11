import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { USER_AVATAR } from "../utils/constants"

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

            <div className=" absolute">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="bg"
                />
            </div>

            <form
                onSubmit={(e) => e.preventDefault()}
                className=" relative mx-auto right-0 left-0 top-28 w-3/12  p-12 bg-black text-white rounded-lg bg-opacity-75"
            >
                <h1 className=" font-bold text-3xl py-4 text-white">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className=" p-4 my-4 w-full bg-gray-700"
                    />
                )}

                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className=" p-4 my-4 w-full bg-gray-700"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className=" p-4 my-4 w-full bg-gray-700"
                />

                <p className=" text-red-600">{errorMessage}</p>

                <button
                    className=" p-4 my-6 bg-red-700 text-white w-full rounded-lg"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <div className=" text-white py-4 " onClick={toggleSignInForm}>
                    {isSignInForm ? (
                        <p>
                            New to Netflix?{" "}
                            <span className=" cursor-pointer underline">Sign Up</span> Now
                        </p>
                    ) : (
                        <p>
                            Already registered?{" "}
                            <span className=" cursor-pointer underline">Sign In</span> Now
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
