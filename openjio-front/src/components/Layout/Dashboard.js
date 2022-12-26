import { useState, useEffect, Fragment } from 'react';
import Button from '../UI/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
// import Card from '../UI/Card'
import { Heading, Card, CardHeader, CardBody, Box } from '@chakra-ui/react'
import Login from '../Auth/Login'
import ActivityForm from '../Activity/ActivityForm';
import ActivityItem from '../Activity/ActivityItem';
import ActivityDetail from '../Activity/ActivityDetail';
// import classes from './Dashboard.module.css';

import { getActiveActivities, reset } from '../../features/activity/activitySlice';
import { openLoginModal, closeLoginModal } from '../../features/modal/modalSlice';

const Dashboard = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { activities, isLoading, isError, message } = useSelector((state) => state.activities)
    const { isLoginOpen } = useSelector((state) => state.loginmodal)

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getActiveActivities());

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])


    const [isShowActivityDetail, setIsShowActivityDetail] = useState(false);
    const [currentActivity, setCurrentActivity] = useState();

    const showActivityCreateModalHandler = (activityId) => {
        if (user) {
            setIsShowActivityDetail(true);
        } else {
            dispatch(openLoginModal());
        }
    }
    const hideActivityCreateModalHandler = () => {
        props.hideCreateActivity(false);
    }

    const showActivityDetailModalHandler = (clickedActivity) => {
        if (user) {
            setIsShowActivityDetail(true);
            setCurrentActivity(clickedActivity)
        } else {
            dispatch(openLoginModal())
        }
    }
    const hideActivityDetailModalHandler = () => {
        setIsShowActivityDetail(false);
    }

    let filteredActivities
    if (user) {
        filteredActivities = activities.reduce((r, o) => {
            r[o.user === user._id ? 'personalActivities' : 'allActivities'].push(o);
            return r;
        }, { personalActivities: [], allActivities: [] });
    } else {
        filteredActivities = { "allActivities": activities }
    }

    return <Fragment>
        {props.onCreateActivity && <ActivityForm isOpen={props.onCreateActivity} onClose={hideActivityCreateModalHandler} />}
        {isLoginOpen && <Login isOpen={isLoginOpen} onClose={() => dispatch(closeLoginModal())} /> }
        {isShowActivityDetail && <ActivityDetail isOpen={isShowActivityDetail} onClose={hideActivityDetailModalHandler} currentActivity={currentActivity} />}

        {user && filteredActivities.personalActivities.length > 0 && (
            <Box mt={5}>
                <Heading size='md' ml={5}>You're hosting!</Heading>
                {filteredActivities.personalActivities.map(activity => (
                    <ActivityItem
                        key={activity._id}
                        activity={activity}
                        onClick={() => showActivityDetailModalHandler(activity)}
                    ></ActivityItem>
                ))}
            </Box>
        )}

        {filteredActivities.allActivities.length > 0 && (
            <Box mt={5}>
                <Heading size='md' ml={5} >Happening Soon!</Heading>
                {filteredActivities.allActivities.map(activity => (
                    <ActivityItem
                        key={activity._id}
                        activity={activity}
                        onClick={() => showActivityDetailModalHandler(activity)}
                    ></ActivityItem>
                ))}
            </Box>

        )}
    </Fragment>
}

export default Dashboard;