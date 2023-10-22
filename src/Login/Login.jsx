import React, { useContext, useEffect } from 'react'
import "./Login.css"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc} from "firebase/firestore"; 
import { auth } from '../../firebase';
import db from '../../firebase';
function Login({user, setUser}) {
    const navigate = useNavigate();

    const loginOnClick = () => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const userObj = {
                name: result.user.displayName,
                email: result.user.email,
                photoUrl: result.user.photoURL,
            }
            console.log(userObj)
            setUser(userObj)
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        const helper = async () => {
            if(user.email !== null && user.email !== ""){
                const docRef = doc(db, "Users", user?.email)
                const docSnap = await getDoc(docRef);
                if(!docSnap.exists()){
                    await setDoc(doc(db, "Users", user?.email), {
                        email: user?.email,
                        salary: 0,
                    })
                }
                navigate('/')
            }
        }
        helper()
    },[user])
  return (
    <div className='login'>
        <button onClick={loginOnClick} className='login__button'>
            Login with Google
        </button>
    </div>
  )
}

export default Login