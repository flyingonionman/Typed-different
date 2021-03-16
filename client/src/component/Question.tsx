import React, {useState, useEffect} from 'react'
import { Box ,Badge } from "@chakra-ui/react"
import post from '../types/posts'
import { Text } from "@chakra-ui/react"

function Question(props:typeof post) {
    useEffect(() => {
    }, )

    return (
        <Box 
            d="flex" 
            flexDir="column"
            width="100%"
            p="6" 
            borderWidth="1px" 
            mt="10"
            borderColor="blackAlpha.500"

            >

            <Box
                d="flex"
                lineHeight="tight"
                width="inherit"
                isTruncated
                justifyContent="space-between"
            >
                <Text 
                    color="black"
                    fontWeight="semibold"
                    fontSize="xl">
                    {props.Title}
                </Text>

                {props.tags.map((element,i) => {
                    return (
                        <Badge 
                            float="right"
                            key ={i} px="2" py="1"  colorScheme="blue">
                            {element.Name}
                        </Badge>
                    );
                })}
            </Box>
            
          

            <Box
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                mt="2"
            >
                <Text 
                    color="orange"

                fontSize="sm">
                    {props.difficulty.level}</Text>

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
