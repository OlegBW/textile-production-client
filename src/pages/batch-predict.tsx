import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import InputFileUpload from '../components/file-upload';
import { getBatchPrediction } from '../api/prediction';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

// TODO: Різні кольори повідомлень
export default function BatchPredictionPage() {
  const { accessToken } = useContext(AuthContext);
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      if (accessToken) {
        const response = await getBatchPrediction(formData, accessToken);
        const downloadURL = URL.createObjectURL(response);

        if (downloadURL) {
          URL.revokeObjectURL(downloadURL);
        }

        setDownloadUrl(downloadURL);
        console.log(response);
      }
      setMessage('File uploaded successfully');
    } catch (error) {
      console.log(error);
      setMessage('Error uploading file');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="85vh"
    >
      <Typography variant="h4" component="h1" gutterBottom mb={4}>
        Batch Prediction Upload
      </Typography>
      <Typography variant="body1" gutterBottom mb={2}>
        Please upload a CSV file containing data for batch prediction.
      </Typography>
      <Typography variant="body2" gutterBottom mb={4}>
        Expected CSV format: Each row represents a data entry, with columns
        separated by commas.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction={'column'} justifyContent={'center'}>
          <InputFileUpload onChange={handleFileChange} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Stack>
      </form>
      {message && (
        <Typography variant="body1" color="error" gutterBottom>
          {message}
        </Typography>
      )}
      {downloadUrl && (
        <Button
          variant="contained"
          color="primary"
          component="a"
          href={downloadUrl}
          download={'result.csv'}
        >
          Download
        </Button>
      )}
    </Box>
  );
}
