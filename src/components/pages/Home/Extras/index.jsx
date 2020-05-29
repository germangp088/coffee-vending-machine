import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Extra from './Extra';

const useStyles = makeStyles((theme) => ({
  extra: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

const Extras = (props) => {
    const classes = useStyles();
    return (
      <React.Fragment>
        <Grid container component={Paper} className={classes.title} align="center">
          <Grid item xs={12} >
            <Typography variant="h5" className="header-message">Extras</Typography>
          </Grid>
        </Grid>
        <Grid container  component={Paper} className={classes.extra}>
          {
              props.extras.map((extra) => <Extra key={`Extra_${extra.id}`} extra={extra} />)
          }
        </Grid>
      </React.Fragment>
    );
}

export default Extras;