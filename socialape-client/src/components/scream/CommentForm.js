import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { useDispatch, useSelector } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  ...theme.otherStyling,
});

const CommentForm = (props) => {
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const UI = useSelector((state) => state.UI);
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  const { classes, screamId } = props;

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitComment(screamId, { body }));
  };

  useEffect(() => {
    console.log('Using effect in Comment Form');
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (Object.entries(UI.errors).length === 0 && !UI.loading) {
      console.log('Using effect to clear body');
      setBody('');
    }
  }, [UI.errors, UI.loading]);

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          errors={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button type="submit" variant="contained" className={classes.button}>
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

  return <Fragment>{commentFormMarkup}</Fragment>;
};

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
};

export default withStyles(styles)(CommentForm);
