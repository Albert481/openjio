import { useState, useEffect, Fragment } from 'react';
import Button from '../UI/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Card from '../UI/Card'
import Login from '../Auth/Login'
import ActivityForm from '../Activity/ActivityForm';
import ActivityItem from '../Activity/ActivityItem';
import ActivityDetail from '../Activity/ActivityDetail';
import classes from './Dashboard.module.css';

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
        filteredActivities = {"allActivities": activities}
    }

    return <Fragment>
        {props.onCreateActivity && <ActivityForm isOpen={props.onCreateActivity} onClose={hideActivityCreateModalHandler} />}
        {isLoginOpen && <Login onClose={() => dispatch(closeLoginModal())} />}
        {isShowActivityDetail && <ActivityDetail onClose={hideActivityDetailModalHandler} currentActivity={currentActivity} />}

        {user && filteredActivities.personalActivities.length > 0 && (
            <Card className={classes.cardbg} >
                <h3>You're hosting!</h3>
                {filteredActivities.personalActivities.map(activity => (
                    <ActivityItem
                        key={activity._id}
                        activity={activity}
                        onClick={() => showActivityDetailModalHandler(activity)}
                    ></ActivityItem>
                ))}

            </Card>
        )}

        {filteredActivities.allActivities.length > 0 ? (
            <Card className={classes.cardbg} >
                <h3>Happening Soon!</h3>
                {filteredActivities.allActivities.map(activity => (
                    <ActivityItem
                        key={activity._id}
                        activity={activity}
                        onClick={() => showActivityDetailModalHandler(activity)}
                    ></ActivityItem>
                ))}

            </Card>
        ) : (
            <Card className={classes.cardbg} >
                <h3>No activities found. Start hosting one!</h3>
            </Card>

        )}

    </Fragment>
}

export default Dashboard;