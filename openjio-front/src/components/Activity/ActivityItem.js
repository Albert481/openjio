

// import classes from './ActivityItem.module.css';
import { Box, Flex, Avatar, AvatarBadge, AvatarGroup, Text, Link, Heading, Button, Card, CardBody, Icon, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, Center, } from '@chakra-ui/react';


var calcDaysAway = (value) => {
    var date_future = new Date(new Date(value * 1000));
    var date_now = new Date();

    var seconds = Math.floor((date_future - (date_now))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);
    
    return days == 0 ? "Happening today!" : "Happening in " + days + " days"
}
    

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
                        <Text>{calcDaysAway(activity.datetime)}</Text>
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