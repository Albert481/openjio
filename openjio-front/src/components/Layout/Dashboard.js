import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heading, Box, Text, Card, CardBody, HStack, Image } from '@chakra-ui/react'
import Login from '../Auth/Login'
import ActivityForm from '../Activity/ActivityForm';
import ActivityItem from '../Activity/ActivityItem';
import ActivityDetail from '../Activity/ActivityDetail';
// import classes from './Dashboard.module.css';

import { getActiveActivities, reset } from '../../features/activity/activitySlice';
import { openLoginModal, closeLoginModal } from '../../features/modal/modalSlice';

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { activities, isError, message } = useSelector((state) => state.activities)
    const { isLoginOpen } = useSelector((state) => state.loginmodal)

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getActiveActivities());

        return () => {
            dispatch(reset())
        }
    }, [user, isError, message, dispatch])


    const [isShowActivityDetail, setIsShowActivityDetail] = useState(false);
    const [currentActivity, setCurrentActivity] = useState();

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
    // Get all activities related to the logged in user and store in personalActivities, the rest goes into allActivities
    if (user) {
        filteredActivities = activities.reduce((r, o) => {
            r[o.user._id === user._id ? 'personalActivities' : 'allActivities'].push(o);
            return r;
        }, { personalActivities: [], allActivities: [] }
        );
    } else {
        filteredActivities = { "allActivities": activities }
    }

    return <Fragment>
        {props.onCreateActivity && <ActivityForm isOpen={props.onCreateActivity} onClose={hideActivityCreateModalHandler} />}
        {isLoginOpen && <Login isOpen={isLoginOpen} onClose={() => dispatch(closeLoginModal())} />}
        {isShowActivityDetail && <ActivityDetail isOpen={isShowActivityDetail} onClose={hideActivityDetailModalHandler} currentActivity={currentActivity} />}


        {user && filteredActivities.personalActivities.length > 0 && (
            <>

                <Box mt={5}>
                    <HStack>
                        <Heading ml={5}>Hello,</Heading><Text fontSize='3xl'>{user.username}</Text>
                    </HStack>

                    <HStack justifyContent='space-evenly' mt={5}>
                        <Card bg="white" borderRadius='3xl' size='lg' minW='10rem' minH='10rem' overflow="hidden">
                            <div>
                                <Image

                                    boxSize='10rem'
                                    objectFit='cover'
                                    src='/fishing.jpg'
                                    alt='fishing'
                                />
                            </div>
                        </Card>
                        <Card bg="white" borderRadius='3xl' size='lg' minW='10rem' minH='10rem' overflow="hidden">

                            <Image

                                boxSize='10rem'
                                objectFit='cover'
                                src='/together.jpg'
                                alt='together'
                            />


                        </Card>
                    </HStack>
                    {/* 
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                        <StatsCard title={'We serve'} stat={'50,000 people'} />
                        <StatsCard title={'In'} stat={'30 different countries'} />
                        <StatsCard title={'Who speak'} stat={'100 different languages'} />
                    </SimpleGrid> */}

                    <Heading size='sm' ml={5} mt={7}>You're hosting!</Heading>
                    {
                        [...filteredActivities.personalActivities]
                            .sort((a, b) => a.datetime > b.datetime ? 1 : -1)
                            .map(activity => (
                                <ActivityItem
                                    key={activity._id}
                                    activity={activity}
                                    onClick={() => showActivityDetailModalHandler(activity)}
                                ></ActivityItem>
                            ))}
                </Box>
            </>

        )}

        {filteredActivities.allActivities.length > 0 && (
            <Box mt={5}>
                <Heading size='sm' ml={5} >Happening Soon!</Heading>
                {
                    [...filteredActivities.allActivities]
                        .sort((a, b) => a.datetime > b.datetime ? 1 : -1)
                        .map(activity => (
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