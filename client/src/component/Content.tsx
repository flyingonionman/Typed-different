import React, {useState, useEffect} from 'react'
import post from '../types/posts';
import Question from './Question'
import { Select } from "@chakra-ui/react"
import { Box} from "@chakra-ui/react"

import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query'

const config = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}

function Content() : JSX.Element {
    const [filter,setFilter]= useState("all");

    // Access the client
    const { isLoading, isError, data, error } : any= useQuery<any>(['questions', filter], 
        async ()=>{
            if (filter==="all" ) {
                return await fetch(`http://localhost:5000/posts/`, {
                    ...config 
                }).then(
                     response => response.json()
                )
            } else {
                return await fetch(`http://localhost:5000/posts/tags/${filter}`, {
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
            flex=".5"
            flexDir="column"
            >

            <Select 
                value= {filter}
                onChange = {handleChange}
                >
                <option value="all">All</option>
                <option value="class">Class</option>
                <option value="object_types">Object Types</option>
            </Select>
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
