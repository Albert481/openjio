import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import classes from './ActivityForm.module.css';
import { createActivity } from '../../features/activity/activitySlice';


const ActivityForm = props => {
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const [enteredActivityNameValue, setEnteredActivityNameValue] = useState('');
    const [enteredActivitySlotValue, setEnteredActivitySlotValue] = useState('');
    const [enteredActivityDateValue, setEnteredActivityDateValue] = useState('');
    const [enteredActivityTypeValue, setEnteredActivityTypeValue] = useState('');

    const formSubmitHandler = event => {
        event.preventDefault();

        console.log('submitted: ' + JSON.stringify(user))

        const createActivityData = {
            name: enteredActivityNameValue,
            type: enteredActivityTypeValue,
            slot: enteredActivitySlotValue,
            datetime: enteredActivityDateValue,
            user: user._id
        }

        // props.onCreateActivity(createActivityData);
        props.onClose(true);
        dispatch(createActivity(createActivityData))

        setEnteredActivityNameValue('');
        setEnteredActivitySlotValue('');
        setEnteredActivityDateValue('');
        setEnteredActivityTypeValue('');
    }

    const activityNameChangeHandler = event => {
        setEnteredActivityNameValue(event.target.value);
    };

    const activitySlotChangeHandler = event => {
        setEnteredActivitySlotValue(event.target.value);
    };

    const activityDateChangeHandler = event => {
        setEnteredActivityDateValue(event.target.value);
    };

    const activityTypeChangeHandler = event => {
        setEnteredActivityTypeValue(event.target.value);
    };
    return (
        <Modal onClose={props.onClose}>
            <form className={classes.container} onSubmit={formSubmitHandler}>
                <div>
                    <Input
                        id="Name"
                        label="Name"
                        type="text"
                        onChange={activityNameChangeHandler} />
                    <Input
                        id="Type"
                        label="Type"
                        type="text"
                        onChange={activityTypeChangeHandler} />
                    <Input
                        id="Slot"
                        label="Slot"
                        type="text"
                        onChange={activitySlotChangeHandler} />
                    <Input
                        id="Date"
                        label="Date"
                        type="date"
                        onChange={activityDateChangeHandler} />
                </div>

                <Button onClick={props.onClose}>Cancel</Button>
                <Button type="submit">Host!</Button>
            </form>
        </Modal>
    )


}

export default ActivityForm;