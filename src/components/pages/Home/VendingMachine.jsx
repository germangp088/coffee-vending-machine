import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Product from './Product';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  vendingMachine: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const VendingMachine = (props) => {
    const classes = useStyles();

    return (
        <div>
          <Grid container>
            <Grid item xs={12} >
              <Typography variant="h5" className="header-message">Vending Machine</Typography>
            </Grid>
          </Grid>
          <Grid container component={Paper} className={classes.vendingMachine}>
            <Grid item lg={12} md={6} xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Products</FormLabel>
                  <RadioGroup aria-label="products" name="products1" value={props.id} onChange={(e) => props.handleChange(e)}>
                    {
                      props.products && props.products.map((product) => <Product key={`Product_${product.id}`} product={product} />)
                    }
                  </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>
    );
}

export default VendingMachine;