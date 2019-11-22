/*
 * Dashboard Actions
 */

import {
  GET_STUDENTS,
  LOADING,
  SAVE_STUDENTS_TO_REDUCER,
  SEARCH,
  SHOW_ERROR_WHILE_FETCHING_STUDENTS,
  SORT_BY_MARKS,
  SORT_BY_NAME,
} from './constants';

/**
 * Calls saga to make an api call to fetch students
 *
 * @param {} username
 */

export function makeApiCallToFetchStudents() {
  return {
    type: GET_STUDENTS,
  };
}

/**
 * Set the result fro api call to reducer
 *
 * @param {object} students List of students from api call
 *
 * @return {object} An action object with a type of SAVE_STUDENTS_TO_REDUCER
 */

export function saveStudentsToReducer(students) {
  return {
    type: SAVE_STUDENTS_TO_REDUCER,
    students,
  };
}

/**
 * Set the error from api call to reducer
 *
 * @param  {object} err The new text of the input field
 *
 * @return {object} An action object with a type of SHOW_ERROR_WHILE_FETCHING_STUDENTS
 */

export function showErrorWhileFetchingStudents(err) {
  return {
    type: SHOW_ERROR_WHILE_FETCHING_STUDENTS,
    err,
  };
}

/**
 * Set the loading state
 *
 * @param  {boolean} isLoading State to check whether it is loading
 *
 * @return {object} An action object with a type of SHOW_ERROR_WHILE_FETCHING_STUDENTS
 */

export function setLoadingState(isLoading) {
  return {
    type: LOADING,
    isLoading,
  };
}

/**
 * Filter the students by name
 *
 * @param {string} query filter by name
 *
 * @return {object} An action object with a type of SHOW_ERROR_WHILE_FETCHING_STUDENTS
 */

export function search(query) {
  return {
    type: SEARCH,
    query,
  };
}

export function sortByName() {
  return {
    type: SORT_BY_NAME,
  };
}

export function sortByMarks() {
  return {
    type: SORT_BY_MARKS,
  };
}
