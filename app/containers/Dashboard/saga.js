/**
 * Gets all students details
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  saveStudentsToReducer,
  showErrorWhileFetchingStudents,
} from './actions';

import { GET_STUDENTS } from './constants';
import request from 'utils/request';

/**
 * Get students
 */
export function* getStudents() {
  const requestURL = `https://api.myjson.com/bins/1dlper`;

  try {
    // Call our request helper (see 'utils/request')
    const students = yield call(request, requestURL);
    yield put(saveStudentsToReducer(students));
  } catch (err) {
    yield put(showErrorWhileFetchingStudents(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* studentsData() {
  // Watches for GET_STUDENTS actions and calls getStudents when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_STUDENTS, getStudents);
}
