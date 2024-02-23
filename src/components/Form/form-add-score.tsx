import React, { useRef, useState } from 'react'
import { Box, VStack, H2, Form, TextField, Button, UseFormReturn, Alert, AlertIcon } from '@northlight/ui'


interface FormAddScoreProps {                                                           // Props for the FormAddScore component
    onScoreSubmit: (name: string, score: number) => void;
}

const FormAddScore: React.FC<FormAddScoreProps> = ({ onScoreSubmit }) => {
    const initialValues = { name: '', score: '' }                                       // Initial values for the form fields
    const formMethods = useRef<UseFormReturn<typeof initialValues>>(null)
    const [feedback, setFeedback] = useState<string | null>(null);                      // State to manage user feedback

    const handleSubmit = (values: typeof initialValues) => {                            // Handle form submission
    const { name, score } = values;
    if (name && score) {
      const parsedScore = parseInt(score, 10);
      if (!isNaN(parsedScore)) {
        onScoreSubmit(name, parsedScore);
        formMethods.current?.reset(initialValues);
        setFeedback(`Score added successfully for ${name}`);                            // Provide user feedback
        setTimeout(() => {
          setFeedback(null);
        }, 4000);
      } else {
        setFeedback('Please enter a valid number for the score.');
      }
    }
  };


  return (
    <VStack align="left" 
            backgroundColor="white" 
            boxShadow="md" 
            w="full" 
            padding={10} 
            borderRadius="lg" >
      <Box>
        <H2 marginBottom="4">Add new score</H2>
        {feedback && (
          <Alert status="success" marginBottom="4">
            <AlertIcon />
            {feedback}
          </Alert>
        )}
        <Form
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          ref={ formMethods }
          enableReinitialize={ true }
          >
            <TextField name="name" label="Name" marginBottom="3"/>
            <TextField name="score" label="Score" type="number" marginBottom="4"/>
            <Button type="submit" backgroundColor="blue.400">Submit Score</Button>
        </Form>
      </Box>
    </VStack>
  )
}

export default FormAddScore