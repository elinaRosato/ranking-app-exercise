import React from 'react'
import { VStack, H3 } from '@northlight/ui'
import ExpandedUserScore from './expanded-user-score';


interface UserScoresProps {
    user: { _id: number; name: string };
    scores: number[];
}

interface ExpandedUserProps {
    usersScores: UserScoresProps[];
    expandedUser: string;
}

const ExpandedUserScores = ({ usersScores, expandedUser } : ExpandedUserProps) => {
    const userScores = usersScores.find(userScores => userScores.user.name === expandedUser);       // Find the updated scores for the expanded user
    if (!userScores) {
        return null; 
    }
    const { user, scores } = userScores;

    return (
        <VStack spacing="3" backgroundColor="white" boxShadow="md" padding="6" borderRadius="xl">
            <H3 marginBottom="4" alignSelf="flex-start">{user.name}: Scores 🏅</H3>
            {scores.map((score, scoreIndex) => (
                <ExpandedUserScore key={scoreIndex} user={user} score={score} index={scoreIndex} />
            ))}
        </VStack>
    )
}

export default ExpandedUserScores