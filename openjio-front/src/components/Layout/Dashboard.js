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

    // const [activityItems, setActivityItems] = useState([
    //     { id: 'a1', activityName: 'Swimming', activitySlot: 3, activityDate: new Date(2023, 1, 20), activityTime: "08:30" },
    //     { id: 'a2', activityName: 'Mahjong', activitySlot: 4, activityDate: new Date(2023, 1, 20), activityTime: "08:30" }
    // ]);
    // const [isCreateActivity, setIsCreateActivity] = useState(false);

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

    // const createActivityHandler = (enteredActivityValues) => {
    //     const activityValues = {
    //         ...enteredActivityValues,
    //         id: Math.random().toString()
    //     };
    //     setActivityItems((prevActivityValues) => {
    //         return [activityValues, ...prevActivityValues];
    //     })
    // }

    return <Fragment>
        {props.onCreateActivity && <ActivityForm onClose={hideActivityCreateModalHandler} />}
        {/* {props.isCreateActivity && <ActivityForm onClose={() => {isCreateActivity(false)}} onCreateActivity={createActivityHandler} />} */}
        {/* {props.isCreateActivity && <ActivityForm onClose={hideActivityCreateModalHandler} />} */}
        {/* <Login onClose={hideLoginModalHandler} /> */}
        {isLoginOpen && <Login onClose={() => dispatch(closeLoginModal())} />}
        {isShowActivityDetail && <ActivityDetail onClose={hideActivityDetailModalHandler} currentActivity={currentActivity}  />}

        <Card className={classes.cardbg} >
            <h3>Happening Soon!</h3>
            {activities.map(activity => (
                <ActivityItem
                    key={activity._id}
                    activity={activity}
                    onClick={() => showActivityDetailModalHandler(activity)}
                ></ActivityItem>
            ))}
            
        </Card>
    </Fragment>
}

export default Dashboard;