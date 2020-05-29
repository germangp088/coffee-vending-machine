import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Product = (props) => {
  return (
    <FormControlLabel value={props.product.id} control={<Radio />} label={props.product.name} />
  );
}

export default Product;