/**
 * Dashboard selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const dashboardState = state => state.dashboard || initialState;

// get students list
const getStudents = () =>
  createSelector(
    dashboardState,
    dashboard => dashboard.filteredStudents,
  );

// get error occurred
const getDashboardError = () =>
  createSelector(
    dashboardState,
    dashboard => dashboard.err,
  );

// get loading state
const getLoadingState = () =>
  createSelector(
    dashboardState,
    dashboard => dashboard.isLoading,
  );

const getSortByNameState = () =>
  createSelector(
    dashboardState,
    dashboard => dashboard.nameSortClicked,
  );

const getSortByMarksState = () =>
  createSelector(
    dashboardState,
    dashboard => dashboard.marksSortClicked,
  );
export {
  dashboardState,
  getStudents,
  getDashboardError,
  getLoadingState,
  getSortByNameState,
  getSortByMarksState,
};
