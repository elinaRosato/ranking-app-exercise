import React, { useState, useEffect, useMemo } from 'react'
import { Container, HStack, H1 } from '@northlight/ui'
import { ExcelDropzone, ExcelRow } from './components/excel-dropzone'
import RankingSection from './components/ranking/ranking-section'
import FormAddScore from './components/form/form-add-score'
import importedScores from './data/scores';
import importedUsers from './data/users';

interface UsersProps {                                                              // Type to represent users
    _id: number; 
    name: string;
}

interface ScoresProps {                                                             // Type to represent scores
    userId: number; 
    score: number;
}

interface UserScoresProps {                                                         // Type to represent a user along with their scores
    user: UsersProps;
    scores: number[];
}

    const App = () => {
    const [users, setUsers] = useState<UsersProps[]>(importedUsers);                // State to hold imported users
    const [scores, setScores] = useState<ScoresProps[]>(importedScores);            // State to hold imported scores
    const [usersScores, setUsersScores] = useState<UserScoresProps[]>([]);          // State to hold users and their scores

    const mappedScores: UserScoresProps[] = useMemo(() => {                         
        const userScoresMap = new Map<number, number[]>();                          // Use a map to efficiently group scores by user ID

        scores.forEach((score) => {                                                 // Iterate through scores and populate the userScoresMap
            const prevScores = userScoresMap.get(score.userId) || [];
            userScoresMap.set(score.userId, [...prevScores, score.score]);
        });

        return users.map((user) => {                                                // Create a mapped array of users with sorted scores
            return {
                user,
                scores: (userScoresMap.get(user._id) || []).slice().sort((a, b) => b - a),
            }
        }).sort((a, b) => b.scores[0] - a.scores[0]); 
    }, [users, scores]);

    useEffect(() => {
        setUsersScores(mappedScores);                                               // Update usersScores state
    }, [mappedScores]);                                          

    const handleScoreSubmit = (name: string, score: number) => {                    // Function to handle submitting a new score
        setUsers((prevUsers) => {
        const existingUser = prevUsers.find((user) => user.name === name);
        if (existingUser) {                                                         // If user exists, add a new score
            const newScore = { userId: existingUser._id, score: score };
            setScores((prevScores) => [ ...prevScores, newScore ]);
            return prevUsers;
        } else {                                                                    // If user doesn't exist, create a new user and add a new score
            const userId = prevUsers.length + 1;
            const newUser = { _id: userId, name: name };
            const newScore = { userId: userId, score: score };
            setScores((prevScores) => [ ...prevScores, newScore ]);
            return [ ...prevUsers, newUser ]; 
        }
        });
    }

    function handleSheetData(data: ExcelRow[]) {                                    // Function to handle data from an Excel sheet
        data.forEach((row) => {
        handleScoreSubmit(row.name, row.score);
        });
    };

    return (
        <Container maxW="full" padding="20" backgroundColor="gray.50">
        <H1 marginBottom="16" textAlign="left" >Ranking App</H1>
        <HStack spacing={10} align="flex-start">
            <ExcelDropzone
            onSheetDrop={ handleSheetData }
            label="Import excel file here"
            />
            <FormAddScore  onScoreSubmit={handleScoreSubmit} />
        </HStack>
        <RankingSection usersScores={usersScores} />
        </Container>
    ) 
}

export default App