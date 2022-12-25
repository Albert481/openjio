import { useEffect, Fragment, ReactNode } from 'react';
import decode from 'jwt-decode';
// import Button from '../UI/Button';
import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { openLoginModal } from '../../features/modal/modalSlice';
import { Box, Flex, Avatar, Link, Heading, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Center, } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';


const Header = props => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onCreateActivity = () => {
        if (!user) {
            dispatch(openLoginModal());
        } else {
            props.onCreateActivity(true);
        }
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout())
        }
    })

    return <Fragment>
        <Box bg={useColorModeValue('white')} borderBottomRadius='3xl' px={6}>
            <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
                <Box><Heading size='xl'>OPENJIO</Heading></Box>

                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={5}>
                        <Button colorScheme='pink' size='lg' onClick={onCreateActivity}>Host</Button>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>

                                {user ? (
                                    <>
                                        <Avatar
                                            size={'md'}
                                            src={user.picture}
                                        />
                                        {/* <img src={user.picture} alt="profile_pic" /><Heading size='md'>{user.username}</Heading> */}
                                    </>

                                ) : (
                                    <Avatar
                                        size={'md'}
                                        src={'https://i.imgur.com/WxNkK7J_d.webp?maxwidth=640&shape=thumb&fidelity=medium'}
                                    />
                                )}

                            </MenuButton>

                            {user ? (
                                <MenuList alignItems={'center'}>
                                    <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                                </MenuList>
                            ) : (
                                <MenuList alignItems={'center'}>
                                    <MenuItem onClick={() => dispatch(openLoginModal())}>Sign Up / Login</MenuItem>
                                </MenuList>
                            )
                            }

                        </Menu>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
        {/* <header className={classes.header}>
            <div className={classes.navbarleft}>
                <Heading size='lg'>OPENJIO</Heading>
            </div>

            <div className={classes.navbarright}>


                <Button onClick={onCreateActivity}>Host</Button>
                {user ? (
                    <>
                        <img src={user.picture} alt="profile_pic" /><Heading size='md'>{user.username}</Heading>
                    </>

                ) : (
                    <img src="https://i.imgur.com/WxNkK7J_d.webp?maxwidth=640&shape=thumb&fidelity=medium" alt="profile_pic"></img>
                )}

            </div>

        </header> */}
    </Fragment>
}

export default Header;