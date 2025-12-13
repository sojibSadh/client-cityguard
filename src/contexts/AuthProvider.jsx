import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { auth } from './../firebase/firebase.init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth';


const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, { displayName, photoURL })
    }

    const updateUserProfile2 = (displayName) => {
        return updateProfile(auth.currentUser, displayName)
    }


    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

        })
        return () => {
            unSub();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
        updateUserProfile,
        updateUserProfile2
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider
