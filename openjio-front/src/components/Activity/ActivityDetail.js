import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import classes from './ActivityForm.module.css';
import { disableActivity } from '../../features/activity/activitySlice';

const ActivityDetail = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    let activity = props.currentActivity

    // Runs twice under STRICT mode, might need to look into this
    console.log(activity)
    return (
        <Modal onClose={props.onClose}>
            <h2>Activity Detail</h2>
            <h3>Name: {activity.name}</h3>
            <h3>Name: {activity.type}</h3>
            <h3>Slot: {activity.slot}</h3>
            <h3>Date: {activity.date}</h3>
            <h3>Members: {activity.members}</h3>
            <Button onClick={props.onClose}>Close</Button>

            {user._id != activity.user ? (
                <Button type="submit">Join</Button>
            ): (
                <Button type="submit" onClick={() => {dispatch(disableActivity(activity._id))}}>Delete</Button>
            )}
            
        </Modal>
    )
}

export default ActivityDetail;