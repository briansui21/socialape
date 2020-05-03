import React, { Fragment, useState, useEffect } from 'react';
import MyButton from '../../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

const styles = (theme) => ({
  ...theme.otherStyling,
  profileImage: {
    maxWidth: '100%',
    minWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
    // marginTop: 50,
    // marginBottom: 50
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

const ScreamDialog = (props) => {
  const dispatch = useDispatch();
  const { classes, screamId } = props;

  const [open, setOpen] = useState(false);
  const UI = useSelector((state) => state.UI);
  const scream = useSelector((state) => state.data.scream);

  const {
    userImage,
    userHandle,
    body,
    likeCount,
    commentCount,
    comments,
  } = scream;

  const handleOpen = () => {
    setOpen(true);
    dispatch(getScream(screamId));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearErrors());
  };

  const dialogMarkup = UI.loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{scream.userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <Grid item sm={12}>
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.DialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(ScreamDialog);
