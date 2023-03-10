import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Input, Select, NumberInput, NumberInputField, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Portal
} from '@chakra-ui/react'
import classes from './ActivityForm.module.css';
import { createActivity } from '../../features/activity/activitySlice';

const ActivityForm = props => {
    const { user } = useSelector((state) => state.auth)


    const dispatch = useDispatch();
    const [enteredActivityNameValue, setEnteredActivityNameValue] = useState('');
    const [enteredActivityTypeValue, setEnteredActivityTypeValue] = useState('');
    const [enteredActivitySlotValue, setEnteredActivitySlotValue] = useState('');
    const [enteredActivityDateValue, setEnteredActivityDateValue] = useState(null);
    const [enteredActivityLocationValue, setEnteredActivityLocationValue] = useState('');
    const [enteredActivityContactValue, setEnteredActivityContactValue] = useState('');

    const isDateError = enteredActivityDateValue === ''
    function validateDateTime(value) {
        var d = new Date(value)
        var now = new Date()
        return (d < now) ? false : true

    }
    const formSubmitHandler = event => {
        event.preventDefault();

        const createActivityData = {
            name: enteredActivityNameValue,
            type: enteredActivityTypeValue,
            slot: enteredActivitySlotValue,
            datetime: enteredActivityDateValue,
            location: enteredActivityLocationValue,
            contact: enteredActivityContactValue,
            user: user._id
        }

        console.log(createActivityData)
        props.onClose(true);
        dispatch(createActivity(createActivityData))

        setEnteredActivityNameValue('');
        setEnteredActivitySlotValue('');
        setEnteredActivityDateValue('');
        setEnteredActivityTypeValue('');
        setEnteredActivityLocationValue('');
        setEnteredActivityContactValue('');
    }

    const activityNameChangeHandler = event => {
        setEnteredActivityNameValue(event.target.value);
    };

    const activityLocationChangeHandler = event => {
        setEnteredActivityLocationValue(event.target.value);
    };

    const activityContactChangeHandler = event => {
        setEnteredActivityContactValue(event.target.value);
    };

    const activityDateChangeHandler = event => {
        if (validateDateTime(event.target.value)) {
            setEnteredActivityDateValue(event.target.value);
        } else {
            setEnteredActivityDateValue('');
        }
        
    };

    return (
        <Portal>
            <Modal onClose={props.onClose} isOpen={props.isOpen} size="xl">
                <form className={classes.container} onSubmit={formSubmitHandler}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Host an activity!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isRequired mt={5}>
                                <FormLabel>Activity Type</FormLabel>
                                <Select placeholder='Select type' size='md' variant='filled' value={enteredActivityTypeValue} onChange={(e) => setEnteredActivityTypeValue(e.target.value)}>
                                    <option value='Sports'>Sports</option>
                                    <option value='Workshops'>Workshops</option>
                                    <option value='Games'>Games</option>
                                    <option value="Drinks">Drinks</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired mt={5}>
                                <FormLabel>Activity Title</FormLabel>
                                <Input type='name' onChange={activityNameChangeHandler} variant='filled' />
                            </FormControl>


                            <FormControl isRequired mt={5} isInvalid={isDateError}>
                                <FormLabel>Date & Time</FormLabel>
                                <Input
                                    id="Date"
                                    label="Date"
                                    type="datetime-local"
                                    onChange={activityDateChangeHandler} variant='filled'
                                />
                                {isDateError && (
                                    <FormErrorMessage>Entered date must be in the future.</FormErrorMessage>
                                )}
                                
                            </FormControl>

                            <FormControl isRequired mt={5}>
                                <FormLabel>Activity Size (1-50)</FormLabel>
                                <NumberInput defaultValue={1} min={1} max={50} maxW={24} onChange={setEnteredActivitySlotValue} value={enteredActivitySlotValue} variant='filled'>
                                    <NumberInputField />
                                </NumberInput>
                                <FormHelperText>*how many participants excluding yourself</FormHelperText>
                            </FormControl>

                            <FormControl isRequired mt={5}>
                                <FormLabel>Contact</FormLabel>
                                <Input onChange={activityContactChangeHandler} variant='filled' />
                                <FormHelperText>*leave your contact details so participants may contact you</FormHelperText>
                            </FormControl>

                            <FormControl mt={5}>
                                <FormLabel>Location</FormLabel>
                                <Input onChange={activityLocationChangeHandler} variant='filled' />
                                <FormHelperText>*where the activity is happening</FormHelperText>
                            </FormControl>


                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={props.onClose}>Cancel</Button>
                            <Button colorScheme='pink' mr={3} type="submit">
                                Host
                            </Button>

                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </Portal>
    )


}

export default ActivityForm;