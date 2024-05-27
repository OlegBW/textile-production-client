import { PredictionInput } from '../types/predict';
import { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Stack,
  Box,
} from '@mui/material';
import { getPrediction } from '../api/prediction';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

const initialState: PredictionInput = {
  req_finish_fabrics: 0,
  fabric_allowance: 0,
  rec_beam_length_yds: 0,
  shrink_allow: 0,
  req_grey_fabric: 0,
  req_beam_length_yds: 0,
  total_pdn_yds: 0,
  warp_count: 0,
  weft_count: 0,
  epi: 0,
  ppi: 0,
};

export default function PredictionPage() {
  const { accessToken } = useContext(AuthContext);
  const [formData, setFormData] = useState<PredictionInput>(initialState);
  const [rejection, setRejection] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit');
    e.preventDefault();
    try {
      if (accessToken) {
        const response = await getPrediction(formData, accessToken);
        setRejection(String(response.result));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Prediction Input Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  key={key}
                  label={key.replace(/_/g, ' ')}
                  name={key}
                  type="number"
                  value={formData[key as keyof PredictionInput]}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Stack>

      <Box
        sx={{
          mt: 2,
          p: 2,
          width: '100%',
          bgcolor: 'grey.100',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color={rejection === 'Rejected' ? 'error' : 'primary'}
        >
          Rejection: {rejection ? Number(rejection).toFixed(3) : 'No result yet'}
        </Typography>
      </Box>
    </Container>
  );
}
