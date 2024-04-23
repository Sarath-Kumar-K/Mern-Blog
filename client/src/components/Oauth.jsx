import React from "react";
import { FcGoogle } from "react-icons/fc";
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase.js';
import {useDispatch} from 'react-redux';
import {signInSuccess} from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const handleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try{
            const resultsFromGoogle = await signInWithPopup(auth,provider);
            // console.log(resultsFromGoogle);
            const res = await fetch('/api/auth/google', {
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    name:resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    googlePhotoUrl:resultsFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        }catch(error){
            next(error);
        }
    }
  return (
    <div>
      <button onClick={handleClick} className="flex items-center justify-center rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-2 border-2 border-black font-semibold">
        <span className="text-lg mr-2">
          <FcGoogle size={24} />
        </span>
        Continue with Google
      </button>
    </div>
  );
};

export default Oauth;
