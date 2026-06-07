'use client';

import {
  Paper,
  Typography,
  Stack,
} from '@mui/material';

import {
  useState,
} from 'react';

import
AIPromptBox
from './AIPromptBox';

import
AISuggestionCard
from './AISuggestionCard';

const suggestions = [

  {
    id: '1',

    title:
      'Create Role',

    description:
      'Generate a new role with permissions',

    prompt:
      'Create a role for support agents',
  },

  {
    id: '2',

    title:
      'Create Workspace',

    description:
      'Generate workspace structure',

    prompt:
      'Create a marketing workspace',
  },

  {
    id: '3',

    title:
      'Generate Onboarding',

    description:
      'Create onboarding workflow',

    prompt:
      'Generate onboarding process',
  },
];

export default function
AIActionPanel() {

  const [
    prompt,
    setPrompt,
  ] = useState('');

  const handleSubmit =
    async () => {

      console.log(
        'AI Prompt:',
        prompt,
      );

      // Phase 2:
      // call AI API
    };

  return (

    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >

      <Typography
        variant="h6"
        gutterBottom
      >
        ✨ AI Assistant
      </Typography>

      <Stack spacing={1}>

        {suggestions.map(
          suggestion => (

            <AISuggestionCard

              key={
                suggestion.id
              }

              suggestion={
                suggestion
              }

              onClick={
                setPrompt
              }
            />
          ),
        )}

      </Stack>

      <AIPromptBox

        value={prompt}

        onChange={
          setPrompt
        }

        onSubmit={
          handleSubmit
        }
      />

    </Paper>
  );
}