import { useState, useEffect, useContext } from 'react';
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
import { AuthContext } from '../context/auth';

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

export default function SignInComponent({
  title,
  authTitle,
  redirectTitle,
  redirectTo,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, setUser, setAccessToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flags, setFlags] = useState<RequestFlags>(initialFlags);
  const location = useLocation();
  const navigate = useNavigate();

  const { isSuccess, isError, isLoading, error } = flags;

  useEffect(() => {
    if (isSuccess) {
      const from = location.state?.from?.pathname || '/';
      console.log('Success', from);
      navigate(from);
    }
  }, [isSuccess, navigate]);

  const signIn = async () => {
    try {
      setFlags((f) => {
        return {
          ...f,
          isLoading: true,
        };
      });
      const response = await api.signIn({ email, password });
      const { access_token } = response;
      setAccessToken(access_token);
      const userResponse = await api.getCurrentUser(access_token);
      setUser(userResponse);
      setFlags((f) => {
        return {
          ...f,
          isSuccess: true,
        };
      });
    } catch (err) {
      console.error('Login error:', err);
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
    signIn();
  };

  const handleRedirect = () => {
    navigate(redirectTo);
  };

  return (
    <Container maxWidth="xs">
      <Stack flexDirection={'column'} justifyContent={'center'}>
        <Typography variant="h3" sx={{ textAlign: 'left', marginBottom: 2 }}>
          {title}
        </Typography>
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
