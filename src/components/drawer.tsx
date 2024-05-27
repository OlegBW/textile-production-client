import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { PATH } from '../path';

import PostAddIcon from '@mui/icons-material/PostAdd';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ListItemStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

export default function DrawerMenu({ isOpen, onClose }: Props) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
      }}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        // onClick={toggleDrawer(false)}
      >
        <List>
          <ListItemButton
            component={Link}
            sx={ListItemStyle}
            to={`/${PATH.reports.group}/${PATH.reports.addReport}`}
          >
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary={'Add report'} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            sx={ListItemStyle}
            to={`/${PATH.predictions.group}`}
          >
            <ListItemIcon>
              <OnlinePredictionIcon />
            </ListItemIcon>
            <ListItemText primary={'Predict'} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            sx={ListItemStyle}
            to={`/${PATH.predictions.group}/${PATH.predictions.batchPrediction}`}
          >
            <ListItemIcon>
              <BatchPredictionIcon />
            </ListItemIcon>
            <ListItemText primary={'Batch Predict'} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            sx={ListItemStyle}
            to={`/${PATH.visualization.group}`}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary={'Visualise'} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            sx={ListItemStyle}
            to={`/${PATH.admin.group}/${PATH.admin.users}`}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Admin panel'} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            sx={ListItemStyle}
            to={`/${PATH.admin.group}/${PATH.admin.log}`}
          >
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary={'Logs'} />
          </ListItemButton>

          <ListItemButton
            component={Link}
            sx={ListItemStyle}
            to={`/${PATH.admin.group}/${PATH.admin.reports}`}
          >
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary={'Report Confirmation'} />
          </ListItemButton>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
