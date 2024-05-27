import { useState, useEffect, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
} from '@mui/material';
import { getReports, submitReport, rejectReport } from '../api/reports';
import { ReportRecord } from '../types/reports';
import { PaginationState } from '../types/http';
import { AuthContext } from '../context/auth';

export function ReportsList() {
  const { accessToken } = useContext(AuthContext);
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportRecord | null>(
    null
  );
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    pageSize: 10,
    totalPages: 1,
  });
  const { page, pageSize, totalPages } = pagination;

  useEffect(() => {
    if (accessToken) {
      getReports(page + 1, pageSize, accessToken).then((res) => {
        setReports(() => res.result);
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

  const handleOpen = (report: ReportRecord) => {
    setSelectedReport(report);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReport(null);
  };

  const handleConfirm = () => {
    if (selectedReport && accessToken) {
      submitReport(selectedReport?.id, accessToken).then(() => {
        setReports(
          reports.filter((report) => report.id !== selectedReport?.id)
        );
        handleClose();
      });
    }
  };

  const handleReject = () => {
    if (selectedReport && accessToken) {
      rejectReport(selectedReport?.id, accessToken).then(() => {
        setReports(
          reports.filter((report) => report.id !== selectedReport?.id)
        );
        handleClose();
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>req_finish_fabrics</TableCell>
              <TableCell>fabric_allowance</TableCell>
              <TableCell>rec_beam_length_yds</TableCell>
              <TableCell>shrink_allow</TableCell>
              <TableCell>req_grey_fabric</TableCell>
              <TableCell>req_beam_length_yds</TableCell>
              <TableCell>total_pdn_yds</TableCell>
              <TableCell>rejection</TableCell>
              <TableCell>warp_count</TableCell>
              <TableCell>weft_count</TableCell>
              <TableCell>epi</TableCell>
              <TableCell>ppi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.req_finish_fabrics}</TableCell>
                <TableCell>{report.fabric_allowance}</TableCell>
                <TableCell>{report.rec_beam_length_yds}</TableCell>
                <TableCell>{report.shrink_allow}</TableCell>
                <TableCell>{report.req_grey_fabric}</TableCell>
                <TableCell>{report.req_beam_length_yds}</TableCell>
                <TableCell>{report.total_pdn_yds}</TableCell>
                <TableCell>{report.rejection}</TableCell>
                <TableCell>{report.warp_count}</TableCell>
                <TableCell>{report.weft_count}</TableCell>
                <TableCell>{report.epi}</TableCell>
                <TableCell>{report.ppi}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(report)}
                    sx={{mb: 2}}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen(report)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalPages * pageSize}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm or Reject Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want {selectedReport?.id}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Submit
          </Button>
          <Button onClick={handleReject} color="secondary">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
