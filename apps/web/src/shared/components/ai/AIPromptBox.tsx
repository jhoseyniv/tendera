'use client';

import {
  Box,
  Button,
  TextField,
} from '@mui/material';

interface Props {

  value: string;

  onChange:
    (value: string) => void;

  onSubmit:
    () => void;
}

export default function AIPromptBox({

  value,

  onChange,

  onSubmit,

}: Props) {

  return (

    <Box>

      <TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="
Create a role for support agents..."
        value={value}
        onChange={e =>
          onChange(
            e.target.value,
          )
        }
      />

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        fullWidth
        onClick={onSubmit}
      >
        Ask AI
      </Button>

    </Box>
  );
}