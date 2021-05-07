import { useCallback, useState } from 'react';
import { Grid, CircularProgress, Typography, makeStyles } from '@material-ui/core';
import { AppAlert } from '../components';
import SearchInput from './Search/SearchInput';
import SearchResult from './Search/Result/Result';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    margin: '1rem',
    fontWeight: 'bold',
  },
  alert: {
    margin: '1rem',
  },
  progressWrapper: {
    minHeight: '20rem',
  },
}));

// TODO: Move to /api/ folder
async function findDomains(query) {
  if (Math.random() * 2 > 1) throw new Error('Internet connection error. Try again.'); // Note: Fake error, only for Demo

  return fetch(`https://unstoppabledomains.com/api/search?q=${query}`).then((response) => response.json());
}

const RESULT_DEFAULT = { exact: [], suggestions: [] };

/**
 * Renders "Search" page to find Unstoppable Domains
 * url: /search
 */
const SearchView = () => {
  const classes = useStyles();
  const [result, setResult] = useState(RESULT_DEFAULT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(async (value) => {
    setLoading(true);
    setError('');
    try {
      const query = String(value)
        .split('.')[0] // remove zone/extension
        .toLowerCase(); // make lowercase
      const res = await findDomains(query);
      setResult(res);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleErrorClose = useCallback((event, reason) => {
    setError('');
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h6" component="h2" align="center">
          Unstoppable Domains Search
        </Typography>
        <SearchInput onSearch={handleSearch} />
        {error ? (
          <AppAlert className={classes.alert} severity="error" onClose={handleErrorClose}>
            {error}
          </AppAlert>
        ) : loading ? (
          <Grid className={classes.progressWrapper} container justify="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          <SearchResult result={result} />
        )}
      </Grid>
    </Grid>
  );
};

export default SearchView;
