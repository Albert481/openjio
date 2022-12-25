import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import classes from './ActivityForm.module.css';
import { disableActivity, joinActivity } from '../../features/activity/activitySlice';

const ActivityDetail = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { activities } = useSelector((state) => state.activities)

    let currentActivity = props.currentActivity

    const [ membersJoined, setMembersJoined] = useState(currentActivity?.members)

    // Runs twice under STRICT mode, might need to look into this

    const hasJoinedActivity = membersJoined.find(member => member == user);

    const joinActivityHandler = async() => {        
        dispatch(joinActivity(currentActivity._id))
        if (hasJoinedActivity) {
            setMembersJoined(currentActivity.members.filter((id) => id != user));
        } else{
            setMembersJoined([...currentActivity.members, user])
        }
    }

    return (
        <Modal onClose={props.onClose}>
            <h2>Activity Detail</h2>
            <h3>Name: {currentActivity.name}</h3>
            <h3>Type: {currentActivity.type}</h3>
            <h3>Slots: {currentActivity.slot}</h3>
            <h3>Date: {currentActivity.date}</h3>
            <h3>Members:</h3>
            <div>
            {membersJoined.map((member, idx) => {
                return (<h3 key={idx}>{member.username}</h3>)
            })}
            </div>
            
            
            <Button onClick={props.onClose}>Close</Button>

            {user._id != currentActivity.user ? (
                <Button type="submit" onClick={joinActivityHandler}>Join</Button>
            ): (
                <Button type="submit" onClick={() => {dispatch(disableActivity(currentActivity._id)); props.onClose();}}>Delete</Button>
            )}
            
        </Modal>
    )
}

export default ActivityDetail;