import React from 'react'
import { useForm } from "react-hook-form";

import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
  } from "@chakra-ui/react";
  
function Login() {
    const { handleSubmit, errors, register, formState } = useForm();

    function validateField(value : string) {
        if (!value) {
            return "Field is required";
        } else return true;
    }

    function onSubmit(values : any) {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve();
            }, 3000);
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel fontSize="4xl" as="legend">Login</FormLabel>

            <FormControl isInvalid={errors.name || errors.password}>
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
            <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
                Submit
            </Button>
        </form>
    );
}

export default Login
