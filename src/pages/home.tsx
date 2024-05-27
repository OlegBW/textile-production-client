import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { PATH } from '../path';

const features = [
  {
    title: 'Add report',
    icon: <PostAddIcon fontSize="large" />,
    link: `${PATH.reports.group}/${PATH.reports.addReport}`,
    description: 'Create and submit new reports easily.',
  },
  {
    title: 'Predict',
    icon: <OnlinePredictionIcon fontSize="large" />,
    link: `${PATH.predictions.group}`,
    description: 'Generate predictions based on your data.',
  },
  {
    title: 'Batch Predict',
    icon: <BatchPredictionIcon fontSize="large" />,
    link: `${PATH.predictions.group}/${PATH.predictions.batchPrediction}`,
    description: 'Run predictions on batch data for large-scale analysis.',
  },
  {
    title: 'Visualize',
    icon: <BarChartIcon fontSize="large" />,
    link: '/visualize',
    description: 'Visualize your data with dynamic charts and graphs.',
  },
  {
    title: 'Admin panel',
    icon: <AdminPanelSettingsIcon fontSize="large" />,
    link: '/admin/users',
    description: 'Manage settings and user permissions.',
  },
  {
    title: 'Logs',
    icon: <EventNoteIcon fontSize="large" />,
    link: '/admin/log',
    description: 'Monitor and review system and user activities.',
  },
  {
    title: 'Report Confirmation',
    icon: <CheckCircleIcon fontSize="large" />,
    link: '/admin/reports',
    description: 'Confirm or reject reports.',
}
];

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={5} justifyContent={'center'}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea href={feature.link} sx={{ height: '100%' }}>
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      height: '100%',
                      alignItems: 'center',
                    }}
                  >
                    {feature.icon}
                    <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
