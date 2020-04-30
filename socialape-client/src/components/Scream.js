import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
//MUI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { useDispatch, useSelector } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Scream = (props) => {
  dayjs.extend(relativeTime);
  const {
    classes,
    scream: { body, createdAt, userImage, userHandle, screamId },
  } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const thisScream = useSelector((state) =>
    state.data.screams.find((scream) => (scream.screamId === screamId))
  );
  const { likeCount, commentCount } = thisScream;

  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId))
      return true;
    else return false;
  };

  const handleLikeScream = () => {
    console.log(screamId);
    dispatch(likeScream(screamId));
  };
  const handleUnlikeScream = () => {
    console.log(screamId);
    dispatch(unlikeScream(screamId));
  };

  const likeButton = !user.authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={handleUnlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Scream);
