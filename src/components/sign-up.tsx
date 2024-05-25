import { useState, useEffect } from 'react';
import {
  // Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useLocation, useNavigate, To } from 'react-router-dom';
import { RequestFlags } from '../types/request';
import * as api from '../api/auth';

type Props = {
  title: string;
  authTitle: string;
  redirectTitle: string;
  redirectTo: To;
};

const initialFlags: RequestFlags = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  error: '',
};

export default function SignUpComponent({
  title,
  authTitle,
  redirectTitle,
  redirectTo,
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flags, setFlags] = useState<RequestFlags>(initialFlags);
  const { isSuccess, isError, isLoading, error } = flags;

  useEffect(() => {
    if (isSuccess) {
      const from = location.state?.from?.pathname || '/';
      console.log('Success', from);
      navigate(from);
    }
  }, [isSuccess, navigate]);

  const signUp = async () => {
    try {
      setFlags((f) => {
        return {
          ...f,
          isLoading: true,
        };
      });
      await api.signUp({ email, password, username });
      setFlags((f) => {
        return {
          ...f,
          isSuccess: true,
        };
      });
    } catch (err) {
      console.error('Register error:', err);
      setFlags((f) => {
        return {
          ...f,
          isError: true,
        };
      });
    } finally {
      setFlags((f) => {
        return {
          ...f,
          isLoading: false,
        };
      });
    }
  };

  const handleSubmit = () => {
    signUp();
  };

  const handleRedirect = () => {
    navigate(redirectTo);
  };

  return (
    <Container maxWidth="xs">
      <Stack mt={4} flexDirection={'column'} justifyContent={'center'}>
        <Typography variant="h3" sx={{ textAlign: 'left', marginBottom: 2 }}>
          {title}
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {isError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
          <Button
            sx={{ flexGrow: 1 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {authTitle}
          </Button>
          <Button
            sx={{ flexGrow: 1 }}
            variant="outlined"
            color="primary"
            onClick={handleRedirect}
            disabled={isLoading}
          >
            {redirectTitle}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
