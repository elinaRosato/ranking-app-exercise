import React, { useState } from 'react'
import { VStack, H2 } from '@northlight/ui'
import RankingContainer from './ranking-container'
import ExpandedUserScores from './expanded-user-scores'

interface UserScoresProps {
    user: { _id: number; name: string };
    scores: number[];
}

interface RankingSectionProps {
    usersScores: UserScoresProps[];
}

const RankingSection = ( {usersScores} : RankingSectionProps) => {
    const [expandedUser, setExpandedUser] = useState<string | null>(null);                // State to keep track of the currently expanded user

    return (
        <VStack marginTop="10">
            <H2 marginY="10" alignSelf="flex-start" >Ranking</H2>
            <VStack spacing={10} align="flex-start">
                <RankingContainer usersScores={usersScores} setExpandedUser={setExpandedUser} />
                {expandedUser ? (
                    <ExpandedUserScores usersScores={usersScores} expandedUser={expandedUser} />
                ) : null}
            </VStack>
        </VStack>
    )
}

export default RankingSection