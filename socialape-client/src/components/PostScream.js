import React, { Fragment, useState, useEffect } from 'react';
import MyButton from '../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
import { useDispatch, useSelector } from 'react-redux';
import { postScream, clearErrors } from '../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  ...theme.otherStyling,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
    marginBottom: 10
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
});

const PostScream = (props) => {
  const dispatch = useDispatch();
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const loading = useSelector((state) => state.UI.loading);
  const globalErrors = useSelector((state) => state.UI.errors);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(clearErrors());
    setOpen(false);
  };

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postScream({ body: body }));
    handleClose();
  };

  useEffect(() => {
    if (globalErrors) {
      setErrors(globalErrors);
    }
  }, [globalErrors])

  return (
    <Fragment>
      <MyButton tip="Post a Scream!" onClick={handleOpen}>
        <AddIcon />
      </MyButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}z
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(PostScream);
