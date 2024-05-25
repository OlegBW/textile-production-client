import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PATH } from '../path';
import { AuthContext } from '../context/auth';

import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: Props) {
  const { user, setUser, setAccessToken } = useContext(AuthContext);

  const logOut = () => {
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          size="large"
          onClick={onMenuClick}
          sx={{ marginRight: '25px' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          color="primary.contrastText"
          sx={{ flexGrow: 1, textDecoration: 'none' }}
        >
          WeaveWare
        </Typography>
        {user ? (
          <Button color="inherit" size="large" onClick={logOut}>
            Log Out
          </Button>
        ) : (
          <Button
            color="inherit"
            size="large"
            component={Link}
            to={`/${PATH.auth.group}/${PATH.auth.login}`}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
