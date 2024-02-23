import React from 'react'
import { P, HStack, H4 } from '@northlight/ui'

interface UserScoresProps {
    user: { _id: number; name: string };
    score: number;
    index: number;
}

const ExpandedUserScore = ({ user, score, index }: UserScoresProps) => {

    return (
        <HStack paddingY="4" paddingX="10" backgroundColor="gray.50" align="center" w='55vw' maxW='1000px' boxShadow="md" borderRadius="xl">
            <H4 w="30%" >{ index + 1 }</H4>
            <P w="50%">{ user.name }</P>
            <P w="20%" textAlign="end">{ score }</P>
        </HStack>
    )
}

export default ExpandedUserScore
