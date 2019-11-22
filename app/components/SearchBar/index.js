import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { Fab, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({
  search,
  sortByName,
  sortByMarks,
  isSortByNameClicked,
  isSortByMarksClicked,
}) {
  const classes = useStyles();
  const [searchString, changeSearchString] = useState('');
  const handleOnChange = debounce(val => {
    search(val);
    changeSearchString(val);
  }, 1000);

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Here"
        inputProps={{ 'aria-label': 'search here' }}
        onChange={e => {
          e.preventDefault();
          handleOnChange(e.target.value);
        }}
      />
      <IconButton
        onClick={() => handleOnChange(searchString)}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      {!isSortByNameClicked ? (
        <Tooltip title="Sorted name in descending order">
          <Fab
            variant="extended"
            aria-label="like"
            color="primary"
            onClick={() => sortByName()}
          >
            Name
            <ArrowDownward />
          </Fab>
        </Tooltip>
      ) : (
        <Tooltip title="Sorted name in ascending order">
          <Fab
            variant="extended"
            aria-label="like"
            color="primary"
            onClick={() => sortByName()}
          >
            Name
            <ArrowUpward />
          </Fab>
        </Tooltip>
      )}
      <Divider className={classes.divider} orientation="vertical" />

      {!isSortByMarksClicked ? (
        <Tooltip title="Sorted marks in descending order">
          <Fab
            variant="extended"
            aria-label="like"
            color="primary"
            onClick={() => sortByMarks()}
          >
            Marks
            <ArrowDownward />
          </Fab>
        </Tooltip>
      ) : (
        <Tooltip title="Sorted marks in ascending order">
          <Fab
            variant="extended"
            aria-label="like"
            color="primary"
            onClick={() => sortByMarks()}
          >
            Marks
            <ArrowUpward />
          </Fab>
        </Tooltip>
      )}
    </Paper>
  );
}
