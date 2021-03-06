import React, { useState} from 'react'
import Content from '../component/Content';
import Login from '../component/Login';
import { Box ,Badge } from "@chakra-ui/react"
import create from 'zustand'
import { useCookies } from 'react-cookie';

function Main() {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const savetoken=(e : string)=>{
        let inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);

        console.log(e);
        setCookie('jwt', e, {path: "/", expires: inFifteenMinutes})
    }

    return (
        <Box
            display="flex"
            flexDir="row"
            height="100vh"
            width="100vw"
            padding="10"
            justifyContent="space-evenly"
            overflowY="scroll"

        >
            <Login savetoken={(e :string)=>savetoken(e)} cookies={cookies}/> 
            <Content/>
        </Box>
    )
}

export default Main
