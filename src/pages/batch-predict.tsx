import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import InputFileUpload from '../components/file-upload';
import { getBatchPrediction } from '../api/prediction';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BatchPredictionPage() {
  const { accessToken } = useContext(AuthContext);
  const [file, setFile] = useState<File>();
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
      toast.info('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      if (accessToken) {
        const response = await getBatchPrediction(formData, accessToken);
        const newDownloadUrl = URL.createObjectURL(response);

        if (downloadUrl) {
          URL.revokeObjectURL(downloadUrl);
        }

        setDownloadUrl(newDownloadUrl);
        console.log(response);
      }
      toast.success('File uploaded successfully');
    } catch (error) {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }

      setDownloadUrl(null);
      console.log(error);
      toast.error('Error uploading file');
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
      {downloadUrl && (
        <Button
          variant="contained"
          color="secondary"
          component="a"
          href={downloadUrl}
          download={'result.csv'}
        >
          Download
        </Button>
      )}
      <ToastContainer />
    </Box>
  );
}
