import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Input from '../UI/Input';
// import Modal from '../UI/Modal';
// import Button from '../UI/Button';
import {
    Input, Select, NumberInput, Number, NumberInputField, Heading, Button, Text, InputField, FormControl, FormLabel, FormErrorMessage, FormHelperText, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Portal
} from '@chakra-ui/react'
import classes from './ActivityDetail.module.css';
import { disableActivity, joinActivity } from '../../features/activity/activitySlice';

const ActivityDetail = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { activities } = useSelector((state) => state.activities)

    let currentActivity = props.currentActivity

    const [membersJoined, setMembersJoined] = useState(currentActivity?.members)

    // Runs twice under STRICT mode, might need to look into this

    const hasJoinedActivity = membersJoined.find(member => member._id == user._id);
    let joinText = "Join"

    const joinActivityHandler = async () => {
        dispatch(joinActivity(currentActivity._id))
        if (hasJoinedActivity) {
            joinText = "Join"
            setMembersJoined(currentActivity.members.filter((member) => member._id != user._id));
        } else {
            joinText = "Leave"
            setMembersJoined((prevState) => [...prevState, user])
        }
    }



    return (
        <Portal>
            <Modal onClose={props.onClose} isOpen={props.isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Activity Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text></Text>
                        <p>Name: {currentActivity.name}</p>
                        <p>Type: {currentActivity.type}</p>
                        <p>Date: {new Date(currentActivity.datetime * 1000).toLocaleString()}</p>
                        <p>Members: ({membersJoined.length}/{currentActivity.slot})</p>
                        <div>
                            {membersJoined.map((member, idx) => {
                                return (
                                    <div key={idx} className={classes.div}>
                                        <img className={classes.img} src={member.picture}></img>
                                        <p>{member.username}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={props.onClose}>Close</Button>

                        {user._id != currentActivity.user ? (
                            <Button colorScheme='pink' mr={3} type="submit" onClick={joinActivityHandler}>
                                {membersJoined.find(member => member._id == user._id) ? (
                                    "Leave"
                                ) : (
                                    "Join"
                                )}
                            </Button>
                        ) : (
                            <Button colorScheme='pink' mr={3} type="submit" onClick={() => { dispatch(disableActivity(currentActivity._id)); props.onClose(); }}>Delete</Button>
                        )}

                    </ModalFooter>
                </ModalContent>

            </Modal>

        </Portal>

    )
}

export default ActivityDetail;