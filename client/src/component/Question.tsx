import React, {useState, useEffect} from 'react'
import { Box ,Badge } from "@chakra-ui/react"
import post from '../types/posts'

function Question(props:typeof post) {
    useEffect(() => {
    }, )

    return (
        <Box 
            d="flex" 
            flexDir="column"
            alignItems="baseline" 
            p="6" 
            maxW="sm" 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden">
            
            {props.tags.map((element,i) => {
                return (
                    <Badge key ={i }borderRadius="full" px="2" colorScheme="teal">
                        {element.Name}
                    </Badge>
                );
            })}

            <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
            >
                {props.difficulty.level} 
            </Box>

            <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
            >
                {props.Title}
            </Box>
            <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
                >
                {props.user.username}
            </Box>
        </Box>
    )
}

export default Question
