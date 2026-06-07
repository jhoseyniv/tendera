import React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export interface AppTableColumn {

  field: string;

  headerName: string;

  render?: (
    row: any,
  ) => React.ReactNode;
}

interface AppTableProps {

  columns:
    AppTableColumn[];

  rows: any[];
}

export default function AppTable({

  columns,

  rows,

}: AppTableProps) {

  if (!rows.length) {

    return (

      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
        }}
      >

        <Typography>
          No data found
        </Typography>

      </Paper>

    );
  }

  return (

    <Paper>

      <Table>

        <TableHead>

          <TableRow>

            {columns.map(
              column => (

                <TableCell
                  key={column.field}
                >

                  {
                    column.headerName
                  }

                </TableCell>

              ),
            )}

          </TableRow>

        </TableHead>

        <TableBody>

          {rows.map(
            row => (

              <TableRow
                key={row.id}
              >

                {columns.map(
                  column => (

                    <TableCell
                      key={
                        column.field
                      }
                    >

                      {column.render
                        ? column.render(
                            row,
                          )
                        : row[
                            column.field
                          ]}

                    </TableCell>

                  ),
                )}

              </TableRow>

            ),
          )}

        </TableBody>

      </Table>

    </Paper>

  );
}