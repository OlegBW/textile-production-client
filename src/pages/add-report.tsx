import { ReportData } from '../types/reports';
import { addReport } from '../api/reports';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

import { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Stack,
} from '@mui/material';

const AddReportPage = () => {
  const { accessToken } = useContext(AuthContext);

  const [formData, setFormData] = useState<ReportData>({
    req_finish_fabrics: '',
    fabric_allowance: '',
    rec_beam_length_yds: '',
    shrink_allow: '',
    req_grey_fabric: '',
    req_beam_length_yds: '',
    total_pdn_yds: '',
    rejection: '',
    warp_count: '',
    weft_count: '',
    epi: '',
    ppi: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (accessToken) {
        await addReport(formData, accessToken);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Stack sx={{ mt: 4, alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add report
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack sx={{ alignItems: 'center' }}>
            <Grid container spacing={1}>
              {Object.keys(formData).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label={key.replace(/_/g, ' ')}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Send
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default AddReportPage;
