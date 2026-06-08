'use client';

import {
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';

import {
  IconButton,
  Stack,
} from '@mui/material';

interface Props {

  onOpen: () => void;

  onEdit: () => void;

  onDelete: () => void;
}

export default function UserActions({

  onOpen,

  onEdit,

  onDelete,
}: Props) {

  return (

    <Stack
      direction="row"
      spacing={1}
    >

      <IconButton
        onClick={onOpen}
      >
        <Visibility />
      </IconButton>

      <IconButton
        onClick={onEdit}
      >
        <Edit />
      </IconButton>

      <IconButton
        onClick={onDelete}
      >
        <Delete />
      </IconButton>

    </Stack>
  );
}