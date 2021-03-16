import React, {useState } from 'react'
import Question from './Question'
import { Select } from "@chakra-ui/react"
import { Box} from "@chakra-ui/react"
import {  HStack,  } from "@chakra-ui/react"

import {
    useQuery,
  } from 'react-query'
import Upload from '../pages/Upload';


const config = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}

const tempurl = "http://0e0f9433715f.ngrok.io"
const localurl = "http://localhost:5000"

function Content() : JSX.Element {

    const [filter,setFilter]= useState("all");

    // Access the client
    const { isLoading, isError, data, error } : any= useQuery<any>(['questions', filter], 
        async ()=>{
            if (filter==="all" ) {
                return await fetch(localurl + `/posts/`, {
                    ...config 
                }).then(
                     response => response.json()
                )
            } else {
                return await fetch( localurl + `/posts/tags/${filter}`, {
                    ...config 
                }).then(
                     response => response.json()
                )
            }
        }
    )
  
    const handleChange = (event: any) => {
        setFilter(event.target.value)
    }

    return (
        <Box
            d="flex"
            flex=".65"
            flexDir="column"

            >

            <HStack spacing="32px">
                
                    <Select 
                        value= {filter}
                        onChange = {handleChange}
                        >
                        <option value="all">All</option>
                        <option value="class">Class</option>
                        <option value="object_types">Object Types</option>
                    </Select>


                <Upload/>

            </HStack>
            
            {/* 
            @TODO: Add pagination
            */}
            
            {   isLoading ? (
                    <span>Loading...</span>
            ) : isError ? ( 
                    <span>Error: {error.message}</span>
            ) : (
                data.map((e: any,i : number)=>
                    <Question 
                        key = {i}
                        Body = {e.Body}
                        Title = {e.Title}
                        difficulty = {e.difficulty}
                        tags = {e.tags}
                        user =  {e.user}
                    />
                )
            )}
        </Box>
    )
}

export default Content
