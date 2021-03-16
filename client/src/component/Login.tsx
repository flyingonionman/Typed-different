
import React from 'react'
import { useForm } from "react-hook-form";

import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Box,
    Heading
  } from "@chakra-ui/react";
 

import {
    useMutation,
} from 'react-query'
import Profile from './Profile';
  

/**
 * Config for strapi POST request
 */
const config = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

interface loginvar {
    email: string, 
    password: string
}

const localurl = "http://localhost:5000"
/**
* Login functionality
*/
function Login({savetoken, cookies}: {savetoken: Function, cookies: any}) {

    /**
     * React-query mutation
     */
    const mutation = useMutation<any, any, any, any>( ({
        email,password
    } : loginvar )=> fetch(localurl + "/auth/local", {
        ...config ,
        body : JSON.stringify({identifier:email, password})
        }).then(
         response => {
            return response.json()
        }).then(
            data => {
                savetoken(data.jwt);
            }
        )
    )

    console.log(cookies);
    /**
     * React-hook-form setup
     */
    const { handleSubmit, errors, register, formState } = useForm();

    function validateField(value : any) {
        if (!value) {
            return "Field is required";
        } else return true;
    }

    function onSubmit(values : any) {
        mutation.mutate({
            email: values.email, 
            password: values.password
        })
    }

    return (
        <Box
            d="flex"
            flex=".25"
            flexDir="column"
        >
            <Heading as="h2" size="2xl" mb="10" mt="0">
                Typed: differently
            </Heading>

            {mutation.isLoading ? (   
                <p>loading...</p>
            ) : (
                <>{mutation.isError ? (
                    <div>An error occurred: {mutation.error.message}</div>
                  ) : 
                    <Box
                        border="solid 1px"
                        borderColor="blackAlpha.900"
                        p="6"
                        flexDir="column"
                        d="flex"
                    >   
                        {cookies.jwt ? (
                            <Profile/>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormLabel fontSize="4xl" as="legend">Login</FormLabel>
            
                                <FormControl isInvalid={errors.email || errors.password}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input
                                        name="email"
                                        placeholder="email"
                                        ref={register({ validate: validateField })}
                                    />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
            
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input
                                        name="password"
                                        placeholder="password"
                                        ref={register({ validate: validateField })}
                                    />
                                    <FormErrorMessage>
                                        {errors.password && errors.password.message}
                                    </FormErrorMessage>
        
                                </FormControl>
                                <Button mt={4} colorScheme="blue" isLoading={formState.isSubmitting} type="submit">
                                    Submit
                                </Button>
                            </form>
                        )}

                        <Button mt={4} colorScheme="blue" 
                        onClick={()=>{
                            window.open(localurl+'/connect/github/redirect')
                        }}
                        >
                                Login with github
                        </Button>
                    </Box>
                  }
                </>
            )}
 
            
        </Box>
        
    );
}

export default Login
