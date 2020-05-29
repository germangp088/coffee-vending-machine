import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const Product = (props) => {
  return (
    <Grid item xs={4}>
      <FormControlLabel value={props.product.id} control={<Radio />} label={props.product.name} />
    </Grid>
  );
}

export default Product;