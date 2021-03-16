import React, { useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Box,
    Button,
    Stack,
    InputGroup,
    Input,
    Textarea,
    InputLeftAddon,
    InputRightAddon,
    FormLabel,
    Select
} from "@chakra-ui/react"

import { 
    AddIcon 
} from '@chakra-ui/icons'

import {
    useMutation,
} from 'react-query'


interface postvar {
    Title: string, 
    Body: string,
    difficulty: number,
    tags : number[]
}


const localurl = "http://localhost:5000"

function Upload(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField : any = React.useRef()
    const [jwtstring, setJwtstring] = useState("")
    
    /**
     * Config for strapi POST request
     */
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${props?.allCookies?.jwt}`
        },
    }

    /**
     * React-query mutation
     */
    const mutation = useMutation( ({
        Title,Body, difficulty, tags
    } : postvar )=> fetch(localurl + "/posts", {
        ...config ,
        body : JSON.stringify({ Title, Body, difficulty, tags
        })
        }).then(
        response => {
            return response.json()
        }).then(
            data => console.log(data)
        )
    )

    console.log(props.allCookies)
    /**
     * React-hook-form setup
     */
     const { handleSubmit, errors, register, formState } = useForm();

     function validateField(value : string) {
         if (!value) {
             return "Field is required";
         } else return true;
     }
 
     function onSubmit(values : any) {
         console.log(values);
         /* mutation.mutate({...values}) */
     }
    
    return (
        <>
            <Button 
                borderRadius="0"
                leftIcon={<AddIcon />}
                colorScheme="blue" 
                onClick={onOpen}
                >
                Create post
            </Button>
            <Drawer
                colorScheme ="blue"
                isOpen={isOpen}
                placement="right"
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                    Create a new post
                    </DrawerHeader>

                    <DrawerBody>
                    <form 
                        id="post-form"
                        onSubmit={handleSubmit(onSubmit)}>

                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="Title">Title</FormLabel>
                                <Input
                                    ref={firstField}
                                    id="Title"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="body">Body</FormLabel>
                                <Textarea id="body" />
                            </Box>

                            <Box>
                            <FormLabel htmlFor="difficulty">Select Difficulty</FormLabel>
                                <Select id="difficulty" defaultValue="Easy">
                                    <option value={1}>Easy</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Hard</option>
                                </Select>
                            
                                <FormLabel mt="5" htmlFor="tag">Select Tag</FormLabel>
                                <Select id="tag" defaultValue="class">
                                    <option value={3}>Class</option>
                                    <option value={1}>Arrays</option>
                                    <option value={2}>Object Types</option>
                                </Select>
                            </Box>
                            
                        </Stack>
                    </form>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" type="submit" form="post-form" onClick={onClose}>
                        Submit
                        
                    </Button>
                    </DrawerFooter>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
            </>
    );
}

export default withCookies(Upload)
