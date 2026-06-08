'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  MenuItem,
  Select,
} from '@mui/material';

import {

  getUserWorkspaces,

  assignWorkspaceToUser,

  removeWorkspaceFromUser,

} from '@/domains/users/api/users.api';

import {
  getWorkspaces,
} from '@/domains/workspaces/api/workspaces.api';

interface Props {

  userId: string;
}

export default function
UserWorkspacesCard({

  userId,
}: Props) {

  const [
    workspaces,
    setWorkspaces,
  ] = useState<any[]>([]);

  const [
    availableWorkspaces,
    setAvailableWorkspaces,
  ] = useState<any[]>([]);

  const [
    selectedWorkspace,
    setSelectedWorkspace,
  ] = useState('');

  async function loadData() {

    const assigned =
      await getUserWorkspaces(
        userId,
      );

    setWorkspaces(
      assigned,
    );

    const all =
      await getWorkspaces();

    setAvailableWorkspaces(
      all,
    );
  }

  useEffect(() => {

    if (
      userId
    ) {

      loadData();
    }

  }, [userId]);

  async function handleAssign() {

    if (
      !selectedWorkspace
    ) {
      return;
    }

    await assignWorkspaceToUser(

      userId,

      selectedWorkspace,
    );

    setSelectedWorkspace(
      '',
    );

    await loadData();
  }

  async function handleRemove(
    workspaceId: string,
  ) {

    await removeWorkspaceFromUser(

      userId,

      workspaceId,
    );

    await loadData();
  }

  return (

    <Card>

      <CardContent>

        <Typography
          variant="h6"
        >

          Assigned Workspaces

        </Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: 12,
            marginBottom: 16,
          }}
        >

          <Select

            size="small"

            value={
              selectedWorkspace
            }

            onChange={e =>
              setSelectedWorkspace(
                e.target.value,
              )
            }

            style={{
              minWidth: 250,
            }}
          >

            {availableWorkspaces.map(
              workspace => (

                <MenuItem

                  key={
                    workspace.id
                  }

                  value={
                    workspace.id
                  }
                >

                  {workspace.name}

                </MenuItem>
              ),
            )}

          </Select>

          <Button

            variant="contained"

            onClick={
              handleAssign
            }
          >

            Assign

          </Button>

        </div>

        <div
          style={{
            display: 'flex',
            flexDirection:
              'column',
            gap: 12,
          }}
        >

          {workspaces.map(
            item => (

              <div

                key={
                  item.workspace_id
                }

                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems:
                    'center',
                }}
              >

                <Typography>

                  {item.workspaces?.name ??
                    item.workspace_id}

                </Typography>

                <Button

                  color="error"

                  onClick={() =>
                    handleRemove(
                      item.workspace_id,
                    )
                  }
                >

                  Remove

                </Button>

              </div>
            ),
          )}

          {workspaces.length ===
            0 && (

            <Typography>

              No workspaces assigned

            </Typography>
          )}

        </div>

      </CardContent>

    </Card>
  );
}