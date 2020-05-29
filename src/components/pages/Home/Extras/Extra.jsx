import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import GrainIcon from '@material-ui/icons/Grain';

const Extra = (props) => {
  const getIcon = (name) => {
    switch (name) {
      case "Milk":
        return <LocalDrinkIcon fontSize="small" />
      case "Cocoa":
        return <GrainIcon fontSize="small" />
      case "Chocolate":
        return <FreeBreakfastIcon fontSize="small" />
      case "Rum":
        return <LocalBarIcon fontSize="small" />
      default:
        break;
    }
  }

  return (
    <Grid item xs={3}>
        <Typography variant="label" className="header-message">{getIcon(props.extra.name)} {props.extra.name}</Typography>
    </Grid>
  );
}

export default Extra;