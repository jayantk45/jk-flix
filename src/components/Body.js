import { createBrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import Browse from "./Browse";
import { RouterProvider } from "react-router-dom";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login></Login>,
        },
        {
            path: "/browse",
            element: <Browse></Browse>,
        },
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
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
            } else {
                // User is signed out
                dispatch(removeUser);
            }
        });
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter}></RouterProvider>
        </div>
    );
};

export default Body;
