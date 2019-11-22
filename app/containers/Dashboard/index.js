import React, { memo, useEffect } from 'react';
import {
  getDashboardError,
  getLoadingState,
  getSortByMarksState,
  getSortByNameState,
  getStudents,
} from './selectors';
import {
  makeApiCallToFetchStudents,
  search,
  setLoadingState,
  sortByMarks,
  sortByName,
} from './actions';

import AppBar from 'components/AppBar';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import PropTypes from 'prop-types';
import StudentCard from 'components/StudentsCard';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const key = 'dashboard';

export function DashboardPage({
  students,
  error,
  isLoading,
  fetchStudents,
  setLoading,
  search,
  sortByName,
  sortByMarks,
  isSortByNameClicked,
  isSortByMarksClicked,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (!students || Object.keys(students).length === 0) {
      setLoading(true);
      fetchStudents();
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Students Dashboard" />
      </Helmet>
      {!isLoading && (
        <AppBar
          search={search}
          sortByName={sortByName}
          isSortByNameClicked={isSortByNameClicked}
          isSortByMarksClicked={isSortByMarksClicked}
          sortByMarks={sortByMarks}
        >
          <Grid container spacing={3}>
            {students &&
              Object.keys(students) &&
              Object.keys(students).length &&
              Object.keys(students).map(id => (
                <StudentCard student={students[id]} key={id} />
              ))}
          </Grid>
        </AppBar>
      )}
      {isLoading && <LoadingIndicator />}
    </>
  );
}

DashboardPage.PropTypes = {
  students: PropTypes.object,
  error: PropTypes.any,
  isLoading: PropTypes.bool,
  fetchStudents: PropTypes.func,
  setLoading: PropTypes.func,
  search: PropTypes.func,
  sortByName: PropTypes.func,
  sortByMarks: PropTypes.func,
  isSortByNameClicked: PropTypes.bool,
  isSortByMarksClicked: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  students: getStudents() || {},
  error: getDashboardError(),
  isLoading: getLoadingState(),
  isSortByNameClicked: getSortByNameState(),
  isSortByMarksClicked: getSortByMarksState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchStudents: () => dispatch(makeApiCallToFetchStudents()),
    setLoading: isLoading => dispatch(setLoadingState(isLoading)),
    search: query => dispatch(search(query)),
    sortByName: () => dispatch(sortByName()),
    sortByMarks: () => dispatch(sortByMarks()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashboardPage);
