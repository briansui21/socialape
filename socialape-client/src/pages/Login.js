import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.otherStyling,
});

const Login = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    loading: false,
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const UI = useSelector((state) => state.UI);

  const { classes } = props;
  const { loading, errors } = UI;

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: state.email,
      password: state.password,
    };
    dispatch(loginUser(userData, props.history));
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" />
        <Typography variant="h4" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit} autoComplete="off">
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="new-email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="off"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={state.password}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            don't have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
