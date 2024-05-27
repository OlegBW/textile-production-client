import { ReportsList } from '../components/reports-list';
import { Container, Typography } from '@mui/material';

export default function SubmitReportPage() {
  return (
    <Container sx={{height: '80vh'}}>
      <Typography variant="h4" gutterBottom textAlign={'center'} mb={4}>
      Report Confirmation
      </Typography>
      <ReportsList />
    </Container>
  );
}
