import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, Paper, Divider, Typography, Tooltip, makeStyles } from '@material-ui/core';
import { AppIconButton, AppIcon } from '../../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.5rem 1.5rem',
    marginTop: '1rem',
  },
  actions: {
    backgroundColor: 'rgba(190, 195, 220, 0.1)',
    padding: '1rem',
    margin: '1rem 0',
  },
  domainWrapper: {
    flexGrow: 2,
  },
  price: {
    fontWeight: 'bold',
  },
  status: {
    textTransform: 'capitalize',
  },
}));

const TITLE_BY_STATUS = {
  reserved: 'Domain is not available at this time',
  registered: 'Domain is unavailable',
};

const ICON_BY_STATUS = {
  reserved: 'reserved',
  registered: 'registered',
};

/**
 * Renders single Item for Search results
 */
const SearchResultItem = ({ className, domain, availability, price, status }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((prevValue) => !prevValue), []);

  function renderDomain(domain) {
    return (
      <Typography variant="body1">
        <b>{domain.label}</b>.{domain.extension}
      </Typography>
    );
  }

  function renderStatus(status) {
    const title = TITLE_BY_STATUS[status] ?? '';
    const icon = ICON_BY_STATUS[status] ?? '';
    return (
      <Tooltip title={title}>
        <Grid container spacing={1} alignItems="center">
          {Boolean(icon) && (
            <Grid item>
              <AppIcon icon={icon} color="disabled" />
            </Grid>
          )}
          <Grid item>
            <Typography className={classes.status} variant="body2" color="textSecondary">
              {status}
            </Typography>
          </Grid>
        </Grid>
      </Tooltip>
    );
  }

  function renderPrice(price) {
    return (
      <Typography className={classes.price} color="primary">
        ${Number(price / 100).toFixed(2)}
      </Typography>
    );
  }

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid container spacing={2} alignItems="center">
        <Grid item className={classes.domainWrapper}>
          {renderDomain(domain)}
        </Grid>
        <Grid item>{availability ? renderPrice(price) : renderStatus(status)}</Grid>
        <Grid item>
          <AppIconButton icon={open ? 'arrowup' : 'arrowdown'} onClick={toggleOpen} />
        </Grid>
      </Grid>
      {open && (
        <>
          <Divider />
          <Paper className={classes.actions} elevation={0}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>TODO: Additional content and actions here...</Grid>
            </Grid>
          </Paper>
        </>
      )}
    </Paper>
  );
};

SearchResultItem.propTypes = {
  className: PropTypes.string,
  domain: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
  }),
  availability: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  status: PropTypes.string,
};

export default SearchResultItem;
