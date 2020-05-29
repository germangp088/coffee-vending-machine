import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Product from './Product';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  vendingMachine: {
    width: '100%',
    height: '80vh',
    padding: theme.spacing(3, 3, 3, 3),
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
  },
  buttom: {
    width: '100%'
  },
  title: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

const VendingMachine = (props) => {
    const classes = useStyles();
    return (
        <div>
          <Grid container component={Paper} className={classes.title} align="center">
            <Grid item xs={12} >
              <Typography variant="h5" className="header-message">Vending Machine</Typography>
            </Grid>
          </Grid>
          <FormControl component="fieldset">
              <RadioGroup aria-label="products" name="products1" value={props.id} onChange={(e) => props.handleChange(e)}>
                <Grid container component={Paper} className={classes.vendingMachine}>
                  <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">Price: $ {parseFloat(props.price).toFixed(2)}</Typography>
                  </Grid>
                  {
                    props.products && props.products.map((product) => <Product key={`Product_${product.id}`} product={product} />)
                  }
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" className={classes.buttom} onClick={props.handleOnClick}>
                      Buy
                    </Button>
                  </Grid>
                </Grid>
              </RadioGroup>
          </FormControl>
        </div>
    );
}

export default VendingMachine;