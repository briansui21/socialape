import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications />
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
