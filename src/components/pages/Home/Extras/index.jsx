import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Extra from './Extra';

const useStyles = makeStyles((theme) => ({
  extra: {
    marginBottom: theme.spacing(3),
  },
}));

const Extras = (props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.extra}>
          <Grid item xs={12} className={classes.extra}>
            <Typography variant="h5" className="header-message">Extras</Typography>
          </Grid>
          {
              props.extras.map((extra) => <Extra key={`Extra_${extra.id}`} extra={extra} />)
          }
        </Grid>
    );
}

export default Extras;