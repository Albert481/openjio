import { useEffect } from 'react';
import axios from 'axios';
import Button from '../UI/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleSignIn, register, reset } from '../../features/auth/authSlice';
import { closeLoginModal } from '../../features/modal/modalSlice';


const Google = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (isSuccess || user) {
            dispatch(closeLoginModal())
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    function handleCallbackResponse(response) {
        // Sends google token to backend for verification
        dispatch(googleSignIn(response.credential))
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(document.getElementById('signInDiv'),
            {
                theme: "outline", size: "large"
            });

    }, []);

    return (
        <div id='signInDiv'>

        </div>
        // <Button onClick={() => google.accounts.id.prompt()}>Login</Button>

    );
}

export default Google;