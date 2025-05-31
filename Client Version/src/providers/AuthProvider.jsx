import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const axiosPublic = useAxiosPublic()
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const deleteOut = () => {
        setLoading(true);
        return deleteUser(auth)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        })

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            console.log('currUser:', currUser);
            setUser(currUser);
            setLoading(false)

            if (currUser?.email) {
                const user = { email: currUser?.email }

                axiosPublic.post('/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                        // console.log('hello')
                        setLoading(false)
                    })
            }
            else {
                axiosPublic.post('/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log("logOut", res.data)
                        setLoading(false)
                    })
            }
        })
        return () => {
            return unsubscribe();
        }
    }, [])



    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        updateUserProfile,
        logOut,
        deleteOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;
