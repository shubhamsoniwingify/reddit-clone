// action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";
const UPDATE_IMAGE = 'UPDATE_IMAGE'
const UPDATE_MODAL = 'UPDATE_MODAL'

// reducer with initial state
const initialState = {
  currentSubReddit: null,
  fetching: false,
  isModalVisible: false,
  posts: null,
  image: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null, currentSubReddit: action.currentSubReddit };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, posts: action.posts };
    case API_CALL_FAILURE:
      return { ...state, fetching: false, posts: null, error: action.error };
    case UPDATE_IMAGE:
      return { ...state,  image: action.image}
    case UPDATE_MODAL: 
      return { ...state, isModalVisible: action.isModalVisible }
    default:
      return state;
  }
}