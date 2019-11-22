/*
 * Dashboard reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import {
  LOADING,
  SAVE_STUDENTS_TO_REDUCER,
  SEARCH,
  SHOW_ERROR_WHILE_FETCHING_STUDENTS,
  SORT_BY_MARKS,
  SORT_BY_NAME,
} from './constants';
import { orderBy, pickBy, startsWith, toArray } from 'lodash';

import produce from 'immer';

// The initial state of the App
export const initialState = {
  students: {},
  err: null,
  isLoading: false,
  filteredStudents: {},
  nameSortClicked: false,
  marksSortClicked: false,
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_STUDENTS_TO_REDUCER:
        draft.students = action.students;
        draft.filteredStudents = action.students;
        draft.isLoading = false;
        break;
      case SHOW_ERROR_WHILE_FETCHING_STUDENTS:
        draft.err = action.err;
        draft.isLoading = false;
        break;
      case LOADING:
        draft.isLoading = action.isLoading;
        break;
      case SEARCH:
        const filter = pickBy(draft.students, student =>
          startsWith(student.name.toLowerCase(), action.query.toLowerCase()),
        );
        draft.filteredStudents = filter;
        break;
      case SORT_BY_NAME:
        if (draft.nameSortClicked === false) {
          const sortedNames = orderBy(
            toArray(draft.filteredStudents),
            ['name'],
            ['asc'],
          );
          draft.filteredStudents = sortedNames;
          draft.nameSortClicked = true;
        } else {
          const sortedNamesDesc = orderBy(
            toArray(draft.filteredStudents),
            ['name'],
            ['desc'],
          );
          draft.filteredStudents = sortedNamesDesc;
          draft.nameSortClicked = false;
        }
        break;
      case SORT_BY_MARKS:
        if (draft.marksSortClicked === false) {
          const sortedNames = orderBy(
            toArray(draft.filteredStudents),
            (z, m) => toArray(z.marks).reduce((sumi, eleme) => eleme + sumi),
            ['asc'],
          );

          draft.filteredStudents = sortedNames;

          draft.marksSortClicked = true;
        } else {
          const sortedNamesDesc = orderBy(
            toArray(draft.filteredStudents),
            (z, m) => toArray(z.marks).reduce((sumi, eleme) => eleme + sumi),
            ['desc'],
          );
          draft.filteredStudents = sortedNamesDesc;
          draft.marksSortClicked = false;
        }
        break;
      default:
        break;
    }
  });

export default dashboardReducer;
