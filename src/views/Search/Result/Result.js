import PropTypes from 'prop-types';
import { Grid, Tabs, Tab, Divider, Typography, makeStyles } from '@material-ui/core';
import ResultItem from '../ResultItem';

const useStyles = makeStyles((theme) => ({
  root: {},
  subTitle: {
    margin: '1rem',
    fontWeight: 'bold',
  },
}));

/**
 * Renders a List with results of the Domain Search
 */
const SearchResult = ({ result }) => {
  const classes = useStyles();

  if (!result || typeof result !== 'object') return null;

  return (
    <Grid container direction="column">
      <Grid item>
        <Tabs value={0} indicatorColor="secondary">
          <Tab label="Results" />
        </Tabs>
      </Grid>
      <Divider />
      {result?.exact?.length > 0 && (
        <Grid item>
          {result?.exact.map((item) => (
            <ResultItem
              key={item?.productId}
              domain={item?.domain}
              status={item?.status}
              availability={item?.availability}
              price={item?.price}
            />
          ))}
        </Grid>
      )}
      {result?.suggestions.length > 0 && (
        <Grid item>
          <Typography className={classes.subTitle} variant="subtitle2" color="primary" component="p">
            Didn't find what you're looking for? How about one of these?
          </Typography>
          {result?.suggestions.map((item) => (
            <ResultItem
              key={item?.productId}
              domain={item?.domain}
              status={item?.status}
              availability={item?.availability}
              price={item?.price}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

SearchResult.propTypes = {
  result: PropTypes.shape({
    domain: PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    }),
    availability: PropTypes.bool,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
  }).isRequired,
};

export default SearchResult;
