import React from 'react'
import { P, HStack, H4 } from '@northlight/ui'

interface UserScoresProps {
    user: { _id: number; name: string };
    scores: number[];
}
interface UserScoreProps {
    userScores: UserScoresProps;
    index: number;
    setExpandedUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserHighScore = ({ userScores, index, setExpandedUser }: UserScoreProps) => {
    const highScore = userScores.scores[0];                                                 // Extract the high score for the user


    const handleButtonClick = () => {                                                       // Callback function to handle button click and update expanded user in the parent component
        setExpandedUser(userScores.user.name);
    };

    const containerColor = index === 0 ? "blue.500" :                                       // Determine the container color based on the index
                           index === 1 ? "blue.300" :
                           index === 2 ? "blue.200" :
                           "transparent";

    return (
        <HStack onClick={handleButtonClick} 
                paddingY="4" 
                paddingX="10" 
                backgroundColor="white"  
                border="solid" 
                borderWidth="3px" 
                borderColor={containerColor} 
                boxShadow="md" 
                align="center" 
                w='55vw' 
                maxW="1000px" 
                borderRadius="xl">
            <H4 width="30%">{ index + 1 }</H4>
            <P width="50%">{ userScores.user.name }</P>
            <P width="20%" textAlign="end">{ highScore }</P>
        </HStack>
    )
}

export default UserHighScore
