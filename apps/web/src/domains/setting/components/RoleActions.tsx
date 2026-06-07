'use client';

import {
  Button,
  Stack,
} from '@mui/material';

interface Props {

  onOpen: () => void;

  onEdit: () => void;

  onDelete: () => void;
}

export default function RoleActions({

  onOpen,

  onEdit,

  onDelete,

}: Props) {

  return (

    <Stack
      direction="row"
      spacing={1}
    >

      <Button
        size="small"
        onClick={onOpen}
      >
        Open
      </Button>

      <Button
        size="small"
        onClick={onEdit}
      >
        Edit
      </Button>

      <Button
        size="small"
        color="error"
        onClick={onDelete}
      >
        Delete
      </Button>

    </Stack>

  );
}