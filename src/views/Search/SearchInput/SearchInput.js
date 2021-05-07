import { useState, useCallback } from 'react';
import { Input, Button, Paper, makeStyles } from '@material-ui/core';
import { AppIcon } from '../../../components';
import { Hidden } from '@material-ui/core';

const BORDER_RADIUS = 6;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '4rem',
    marginTop: '1rem',
    paddingLeft: '1.5rem',
    borderRadius: BORDER_RADIUS,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 5px 0 rgb(0 0 0 / 20%), 0 1px 0 -1px rgb(0 0 0 / 23%)',
  },
  input: {
    flexGrow: 2,
  },
  button: {
    height: '100%',
    fontSize: '1.125rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    borderTopLeftRadius: 0,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: BORDER_RADIUS,
  },
}));

/**
 * Renders the Domain name input with Search button
 */
const SearchInput = ({ onSearch }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const doSearch = useCallback(() => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(value);
    }
  }, [value, onSearch]);

  const handleInputChange = useCallback((event) => setValue(event?.target?.value), []);

  const handleInputKeyDown = useCallback(
    (event) => {
      if (event?.keyCode === 13) {
        // "Enter" pressed
        doSearch();
      }
    },
    [doSearch]
  );

  const handleButtonClick = useCallback(() => {
    doSearch();
  }, [doSearch]);

  return (
    <Paper className={classes.root} elevation={0}>
      <Input
        className={classes.input}
        autoFocus
        disableUnderline
        value={value}
        placeholder="Find a blockchain domain"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        startIcon={<AppIcon icon="search" />}
        onClick={handleButtonClick}
      >
        <Hidden xsDown>Search</Hidden>
      </Button>
    </Paper>
  );
};

export default SearchInput;
