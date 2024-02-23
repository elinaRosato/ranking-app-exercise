import React from 'react'
import { VStack, H3 } from '@northlight/ui'
import UserHighScore from './user-high-score'

interface UserScoresProps {
    user: { _id: number; name: string };
    scores: number[];
  }

interface RankingContainerProps {
    usersScores: UserScoresProps[];
    setExpandedUser: React.Dispatch<React.SetStateAction<string | null>>;
  }

const RankingContainer = ({ usersScores, setExpandedUser }: RankingContainerProps ) => {                                                                     // Run this effect once when the component mounts
    return (
        <VStack  padding="6" 
                spacing="3"  
                backgroundColor="gray.100" 
                boxShadow="md" 
                borderRadius="xl" 
                alignItems="center" >
            <H3 marginBottom="4" alignSelf="flex-start">
                High Scores 🏆
            </H3>
            {usersScores.map((userScores, index) => (
                <UserHighScore key={userScores.user._id} 
                            userScores={userScores} 
                            index={index} 
                            setExpandedUser={setExpandedUser}  
                />
            ))}
        </VStack>
    )
}

export default RankingContainer