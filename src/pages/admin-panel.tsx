import { useState, useContext } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { deleteUser, updateUserRole } from '../api/admin';
import { AuthContext } from '../context/auth';

export default function AdminPanelPage() {
  const { accessToken } = useContext(AuthContext);

  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  // const handleUserUpdate = async () => {
  //   try {
  //     await axios.put(`/admin/users/${userId}`);
  //     alert('User updated successfully!');
  //   } catch (error) {
  //     alert('Failed to update user.');
  //   }

  //   console.log(0);
  // };

  const handleUserDelete = async () => {
    try {
      if (accessToken) {
        await deleteUser(parseInt(userId), accessToken);
        alert('User deleted successfully!');
      }
    } catch (error) {
      alert('Failed to delete user.');
    }
  };

  const handleRoleChange = async () => {
    try {
      if (accessToken) {
        await updateUserRole(parseInt(userId), { role }, accessToken);
        alert('Role updated successfully!');
      }
    } catch (error) {
      alert('Failed to update role.');
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4">User Management</Typography>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Role"
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        {/* <Button variant="contained" color="primary" onClick={handleUserUpdate}>
          Update User
        </Button> */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUserDelete}
          style={{ marginLeft: 10 }}
        >
          Delete User
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRoleChange}
          style={{ marginLeft: 10 }}
        >
          Change Role
        </Button>
      </div>
    </Paper>
  );
}
