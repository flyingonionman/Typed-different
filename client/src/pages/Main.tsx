import React from 'react'
import Content from '../component/Content';
import Login from '../component/Login';
import { Box ,Badge } from "@chakra-ui/react"

function Main() {
    return (
        <Box
            display="flex"
            flexDir="row"
            backgroundColor="blackAlpha.400"
            height="100vh"
            width="100vw"
            padding="10"
        >
            <Login/>
            <Content/>
        </Box>
    )
}

export default Main
