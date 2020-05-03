import React, { Fragment, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { useDispatch } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  },
};

const DeleteScream = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { classes } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteScream = () => {
    console.log("Handle delete scream: " + props.screamId);
    dispatch(deleteScream(props.screamId));
    setOpen(false);
  };

  return (
    <div>
      <Fragment>
        <MyButton
          tip="Delete Scream"
          onClick={handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            Are you sure you want to delete this stream?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteScream} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
};

DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default withStyles(styles)(DeleteScream);
