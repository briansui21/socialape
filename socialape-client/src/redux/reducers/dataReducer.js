import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        screams: action.payload,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return {
        ...state,
        screams: [
          ...state.screams
        ]
      };
    case DELETE_SCREAM:
      let index2 = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );

      state.screams.splice(index2, 1);
      return {
        ...state,
        screams: [
          ...state.screams
        ]
      };
    default:
      return state;
  }
};
