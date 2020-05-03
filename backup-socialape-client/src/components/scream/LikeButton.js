import React from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

const LikeButton = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { screamId } = props;

  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId))
      return true;
    else return false;
  };

  const handleLikeScream = () => {
    dispatch(likeScream(screamId));
  };
  const handleUnlikeScream = () => {
    dispatch(unlikeScream(screamId));
  };

  const likeButton = !user.authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={handleUnlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return likeButton;
};

LikeButton.propTypes = {
  screamId: PropTypes.string.isRequired,
};

export default LikeButton;
