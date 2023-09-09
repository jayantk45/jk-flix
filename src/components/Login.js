import React, { useState } from "react";
import Header from "./Header";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }



    return (
        <div>
            <Header></Header>

            <div className=" absolute">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="bg"
                />
            </div>

            <form className=" relative mx-auto right-0 left-0 top-28 w-3/12  p-12 bg-black rounded-lg bg-opacity-75">
                <h1 className=" font-bold text-3xl py-4 text-white">{isSignInForm ? ("Sign In") : ("Sign Up")}</h1>

                {!isSignInForm &&
                    <input
                        type="text"
                        placeholder="Full Name"
                        className=" p-4 my-4 w-full bg-gray-700"
                        name=""
                        id=""
                    />
                }

                <input
                    type="email"
                    placeholder="Email Address"
                    className=" p-4 my-4 w-full bg-gray-700"
                    name=""
                    id=""
                />
                <input
                    type="password"
                    placeholder="Password"
                    className=" p-4 my-4 w-full bg-gray-700"
                    name=""
                    id=""
                />
                <button className=" p-4 my-6 bg-red-700 text-white w-full rounded-lg">{isSignInForm ? ("Sign In") : ("Sign Up")}</button>

                <div className=" text-white py-4 " onClick={toggleSignInForm}>
                    {
                        isSignInForm ? (<p>New to Netflix? <span className=" cursor-pointer underline">Sign Up</span> Now</p>) : (<p>Already registered? <span className=" cursor-pointer underline">Sign In</span> Now</p>)
                    }
                </div>
            </form>
        </div>
    );
};

export default Login;
