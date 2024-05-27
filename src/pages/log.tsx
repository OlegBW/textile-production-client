import React, { useState, useEffect, useContext } from 'react';
import { getLogs } from '../api/admin';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Container,
  Typography,
} from '@mui/material';
import { Log } from '../types/logs';
import { AuthContext } from '../context/auth';
import { PaginationState } from '../types/http';

export default function LogsPage() {
  const { accessToken } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logs, setLogs] = useState<Log[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    pageSize: 10,
    totalPages: 1,
  });
  const { page, pageSize, totalPages } = pagination;

  useEffect(() => {
    if (accessToken) {
      getLogs(page + 1, pageSize, accessToken).then((res) => {
        setLogs(() => res.result);
        setPagination((p) => {
          return {
            ...p,
            totalPages: res.pagination.total_pages,
          };
        });
      });
    }
  }, [accessToken, page, pageSize]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPagination((p) => {
      return {
        ...p,
        page: newPage,
      };
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination((p) => {
      return {
        ...p,
        pageSize: parseInt(event.target.value, 10),
        page: 0,
      };
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        Logs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.user.username}</TableCell>
                <TableCell>{log.user.email}</TableCell>
                <TableCell>{log.user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalPages * pageSize}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
