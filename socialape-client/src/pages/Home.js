import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

const Home = () => {
  const dispatch = useDispatch();
  const screams = useSelector(state => state.data.screams);
  const loading = useSelector(state => state.data.loading);

  useEffect(() => {
    dispatch(getScreams());
  }, [dispatch]);

  let recentScreamsMarkup = (!loading) ? (
    screams.map((scream) => <Scream scream={scream} key={scream.screamId} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
