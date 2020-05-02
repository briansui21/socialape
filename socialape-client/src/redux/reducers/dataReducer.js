import {
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  screams: [],
  scream: { comment: [] },
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
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };

    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
        screams: [...state.screams],
      };
    case DELETE_SCREAM:
      let index2 = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );

      state.screams.splice(index2, 1);
      return {
        ...state,
        screams: [...state.screams],
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        screams: [...state.screams],
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    default:
      return state;
  }
};
