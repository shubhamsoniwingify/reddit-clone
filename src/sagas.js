import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchPosts(currentSubReddit) {
  return axios({
    method: "get",
    url: `https://www.reddit.com/r/${currentSubReddit}.json`
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  try {
    const response = yield call(fetchPosts, action.currentSubReddit);
    const posts = response.data.data.children;

    // dispatch a success action to the store with the new posts
    yield put({ type: "API_CALL_SUCCESS", posts });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}