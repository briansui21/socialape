import React, { useState } from 'react';
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

const styles = (theme) => ({
  ...theme.otherStyling,
});

const Signup = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    loading: false,
    errors: {},
  });

  const { classes } = props;
  const { errors, loading } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({
      ...state,
      loading: true,
    });
    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      handle: state.handle,
    };
    axios
      .post('/signup', newUserData)
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        setState({
          ...state,
          loading: false,
        });
        props.history.push('/');
      })
      .catch((err) => {
        setState({
          ...state,
          errors: err.response.data,
          loading: false,
        });
      });
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
          Signup
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            autoComplete="off"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            autoComplete="off"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={state.handle}
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
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            already have an account ? log in <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
