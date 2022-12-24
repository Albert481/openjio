import { Fragment } from 'react';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeLoginModal } from '../../features/modal/modalSlice';

import Google from '../Auth/Google'
import { Link, useNavigate } from 'react-router-dom'


const Login = props => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Modal onClose={props.onClose}>
            <h3>Please sign in first</h3>
            <Google />
            <Button onClick={() => {dispatch(closeLoginModal())}}>Cancel</Button>
        </Modal>

    )
        
}

export default Login;