'use client';

import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import { AISuggestion }
from './types';

interface Props {

  suggestion:
    AISuggestion;

  onClick:
    (prompt: string)
      => void;
}

export default function
AISuggestionCard({

  suggestion,

  onClick,

}: Props) {

  return (

    <Card
      sx={{
        cursor: 'pointer',
        mb: 1,
      }}
      onClick={() =>
        onClick(
          suggestion.prompt,
        )
      }
    >

      <CardContent>

  <Typography
    variant="subtitle2"
    sx={{
      fontWeight: 600,
    }}
  >
    {suggestion.title}
  </Typography>

  <Typography
    variant="body2"
  >
    {suggestion.description}
  </Typography>

</CardContent>

    </Card>
  );
}