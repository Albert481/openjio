

// import classes from './ActivityItem.module.css';
import { Box, Flex, Avatar, AvatarBadge, AvatarGroup, Link, Heading, Button, Card, CardBody, Icon, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, Center, } from '@chakra-ui/react';

const ActivityItem = (props) => {
    let activity = props.activity
    return (
        <Card bg="white" borderRadius='3xl' mt={5} size='lg' m={5}>
            <CardBody>
                <div onClick={() => props.onClick(activity._id)}>
                    <label htmlFor="a">
                        <i className="l">
                            {/* <img src="https://i.imgur.com/x3omKbe.png" alt="profile_pic"></img> */}
                        </i>

                        <strong>{activity.name} {activity.members.length}/{activity.slot}</strong>
                        <AvatarGroup size='sm' max={2}>
                            {activity.members.map(member => (
                                <Avatar key={member._id} name={member.username} src={member.picture} />
                            ))}
                        </AvatarGroup>
                        {/* <span data-o="opened" data-c="closed"></span> */}
                    </label>
                </div>
            </CardBody>

        </Card>

    );
};

export default ActivityItem;