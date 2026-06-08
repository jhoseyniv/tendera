'use client';

import {
  IconButton,
  Tooltip,
} from '@mui/material';

import VisibilityIcon
from '@mui/icons-material/Visibility';

import EditIcon
from '@mui/icons-material/Edit';

import DeleteIcon
from '@mui/icons-material/Delete';

interface Props {

  onOpen: () => void;

  onEdit: () => void;

  onDelete: () => void;
}

export default function
PermissionActions({

  onOpen,

  onEdit,

  onDelete,

}: Props) {

  return (

    <>

      <Tooltip
        title="View"
      >

        <IconButton
          size="small"
          onClick={
            onOpen
          }
        >

          <VisibilityIcon
            fontSize="small"
          />

        </IconButton>

      </Tooltip>

      <Tooltip
        title="Edit"
      >

        <IconButton
          size="small"
          onClick={
            onEdit
          }
        >

          <EditIcon
            fontSize="small"
          />

        </IconButton>

      </Tooltip>

      <Tooltip
        title="Delete"
      >

        <IconButton
          size="small"
          color="error"
          onClick={
            onDelete
          }
        >

          <DeleteIcon
            fontSize="small"
          />

        </IconButton>

      </Tooltip>

    </>

  );
}