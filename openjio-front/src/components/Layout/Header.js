import { useEffect, Fragment } from 'react';
import decode from 'jwt-decode';
import Button from '../UI/Button';
import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom'
import { openLoginModal } from '../../features/modal/modalSlice';


const Header = props => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onCreateActivity = () => {
        if (!user) {
            dispatch(openLoginModal());
        } else {
            props.onCreateActivity(true);
        }
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout())
        }
    })

    return <Fragment>
        <header className={classes.header}>
            <div className={classes.navbarleft}>
                <h1>OPENJIO</h1>
            </div>

            <div className={classes.navbarright}>


                <Button onClick={onCreateActivity}>Host</Button>
                {user ? (
                    <>
                        <img src={user.picture} alt="profile_pic" /><h3> {user.username}</h3>
                    </>

                ) : (
                    <img src="https://i.imgur.com/WxNkK7J_d.webp?maxwidth=640&shape=thumb&fidelity=medium" alt="profile_pic"></img>
                )}

            </div>

        </header>
    </Fragment>
}

export default Header;