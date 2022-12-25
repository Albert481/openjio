import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Input, Select, NumberInput, Number, NumberInputField, Button, InputField, FormControl, FormLabel, FormErrorMessage, FormHelperText, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react'
import classes from './ActivityForm.module.css';
import { createActivity } from '../../features/activity/activitySlice';


const ActivityForm = props => {
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const [enteredActivityNameValue, setEnteredActivityNameValue] = useState('');
    const [enteredActivityTypeValue, setEnteredActivityTypeValue] = useState('');
    const [enteredActivitySlotValue, setEnteredActivitySlotValue] = useState('');
    const [enteredActivityDateValue, setEnteredActivityDateValue] = useState('');


    const formSubmitHandler = event => {
        event.preventDefault();

        const createActivityData = {
            name: enteredActivityNameValue,
            type: enteredActivityTypeValue,
            slot: enteredActivitySlotValue,
            datetime: enteredActivityDateValue,
            user: user._id
        }

        console.log(createActivityData)
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

                        <FormControl isRequired mt={5}>
                            <FormLabel>Date & Time</FormLabel>
                            <Input
                                id="Date"
                                label="Date"
                                type="datetime-local"
                                onChange={activityDateChangeHandler} variant='filled' />
                        </FormControl>

                        <FormControl isRequired mt={5}>
                            <FormLabel>Member Slots</FormLabel>
                            <NumberInput maxW={24} clampValueOnBlur={false} onChange={setEnteredActivitySlotValue} value={enteredActivitySlotValue} variant='filled'>
                                <NumberInputField />
                            </NumberInput>

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

        // <Modal onClose={props.onClose}>
        //     <form className={classes.container} onSubmit={formSubmitHandler}>
        //         <div>
        //             <h2>Host an activity!</h2>

        //             <FormControl mt={4}>
        //                 <FormLabel>Activity Type</FormLabel>
        //                 <Select placeholder='Select type' size='md' variant='filled' value={enteredActivityTypeValue} onChange={(e) => setEnteredActivityTypeValue(e.target.value)}>
        //                     <option value='Sports'>Sports</option>
        //                     <option value='Workshops'>Workshops</option>
        //                     <option value='Games'>Games</option>
        //                     <option value="Drinks">Drinks</option>
        //                 </Select>
        //             </FormControl>
        //             <FormControl mt={4}>
        //                 <FormLabel>Activity Title</FormLabel>
        //                 <Input type='name' onChange={activityNameChangeHandler} />
        //                 <FormHelperText>Chess session, Open water fishing</FormHelperText>
        //             </FormControl>

        //             <FormControl mt={4}>
        //                 <FormLabel>Date & Time</FormLabel>
        //                 <Input
        //                 id="Date"
        //                 label="Date"
        //                 type="datetime-local"
        //                 onChange={activityDateChangeHandler} />
        //             </FormControl>

        //             <FormControl mt={4}>
        //                 <FormLabel>Member Slots</FormLabel>
        //                 <NumberInput defaultValue={2} max={32} maxW={24} clampValueOnBlur={false} onChange={setEnteredActivitySlotValue} value={enteredActivitySlotValue}>
        //                     <NumberInputField />
        //                 </NumberInput>
        //                 <FormHelperText>How many people can join?</FormHelperText>
        //             </FormControl>


        //         </div>

        //         <Button onClick={props.onClose}>Cancel</Button>
        //         <Button type="submit">Host!</Button>
        //     </form>
        // </Modal>
    )


}

export default ActivityForm;