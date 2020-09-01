import React from 'react'
import { Box, Link, Flex, Button } from '@chakra-ui/core'
import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({ }) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
    const [{ data, fetching }] = useMeQuery()
    let content = <Box>. . .</Box>

    if (fetching) {

    } else if (!data?.me) { // user not logged in
        content = (
            <>
                <NextLink href='/login'>
                    <Link mr={2}>
                        login
                    </Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link>
                        register
                    </Link>
                </NextLink>
            </>
        )
    } else { // user logged in
        content = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button
                    variant='link'
                    onClick={() => {
                        logout()
                    }}
                    isLoading={logoutFetching}
                >
                    logout
                </Button>
            </Flex>
        )
    }

    return (
        <Flex bg='tomato' p={4} >
            <Box color='white' ml='auto'>
                {content}
            </Box>
        </Flex>
    )
}