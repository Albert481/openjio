import { Fragment, useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Portal, Button, Center } from '@chakra-ui/react'
// import Button from '../UI/Button';
// import Modal from '../UI/Modal';
import { FaGoogle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { closeLoginModal } from '../../features/modal/modalSlice';
import { googleSignIn, register, reset } from '../../features/auth/authSlice';

import { Link, useNavigate } from 'react-router-dom'


const Login = props => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const { user, isError, isSuccess, message } = useSelector(
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
    }, [user, isError, isSuccess, message, dispatch])

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
    }, []);

    return (
        <Portal>
            <Modal onClose={props.onClose} isOpen={props.isOpen} size='md' isCentered>
                <ModalOverlay />
                <ModalContent maxW="20rem">
                    <ModalHeader mt={4}><Center>Please sign in</Center></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Center>
                        <Button
                            colorScheme='red'
                            leftIcon={<FaGoogle />}
                            mt={4}
                            mb={4}
                            size="md"
                            isLoading={isLoading}
                            loadingText='Waiting..'
                            onClick={() => {
                                setIsLoading(true);
                                /* global google */
                                document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                                google.accounts.id.prompt();
                            }}
                        >LOGIN WITH GOOGLE</Button>
                        </Center>
                        
                    </ModalBody>
                </ModalContent>

            </Modal>

        </Portal>
    )

}

export default Login;