import React from 'react';
import { FormHelperText } from '@material-ui/core';
import { getProducts, getExtras, postCash } from "../../../request";
import Loading from '../../common/Loading';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import VendingMachine from './VendingMachine';
import Typography from '@material-ui/core/Typography';
import Extras from './Extras';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      product: { id: '', price: 0, name: '' },
      extras: [],
      loading: true,
      success: false,
      errorMessage: '',
      notFound: false
    };
    this.getExtras = this.getExtras.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRandomSelection = this.handleRandomSelection.bind(this);
  }

  componentDidMount= async() => {
    await this.getProducts();
    await this.getExtras();
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      success: false
    });
  };

  getProducts = async() => {
    try {
      this.setState({
        loading: true
      });
      const products = await getProducts(); // API call to get products
      let initialProduct = { id: '', price: 0, name: '' };
      const lastSelectedCoffeeId = localStorage.getItem('lastSelectedCoffeeId');

      if (lastSelectedCoffeeId) {
        const storedProduct = products.find(p => p.id === lastSelectedCoffeeId);
        if (storedProduct) {
          initialProduct = storedProduct;
        }
      }

      this.setState({
        products: products,
        product: initialProduct, // Set initial product based on localStorage or default
        loading: false
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        loading: false
      });
    }
  }

  getExtras = async() => {
    try {
      this.setState({
        loading: true
      });
      const extras = await getExtras();
      this.setState({
        extras: extras,
        loading: false
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        loading: false
      });
    }
  }

  handleOnClick = async() => {
    try {
      this.setState({
        loading: true
      });
      await postCash(this.state.product);
      this.setState({
        product: { id: '', price: 0, name: '' },
        loading: false,
        success: true
      });
      localStorage.removeItem('lastSelectedCoffeeId'); // Clear selection after purchase
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        loading: false
      });
    }
  };

  handleChange = (event) => {
    const product = this.state.products.find(p => p.id === event.target.value);
    this.setState({
      product: product
    });
    // Save the selected product ID to localStorage
    if (product) {
      localStorage.setItem('lastSelectedCoffeeId', product.id);
    } else {
      localStorage.removeItem('lastSelectedCoffeeId');
    }
  };

  handleRandomSelection = () => {
    const { products } = this.state;
    if (products && products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const randomProduct = products[randomIndex];
      this.setState({
        product: randomProduct
      });
      localStorage.setItem('lastSelectedCoffeeId', randomProduct.id);
    }
  };

  render() {
    return (
      <main>
        <Loading open={this.state.loading} />
        <FormHelperText error={true}>
          { this.state.errorMessage && <Alert severity="error">This is an error message!</Alert>}
        </FormHelperText>
        <Snackbar open={this.state.success} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            <Typography variant="label" className="header-message">Take your coffe! <LocalCafeIcon fontSize='small' /></Typography>
          </Alert>
        </Snackbar>
        <Extras extras={this.state.extras} />
        <VendingMachine products={this.state.products}
          handleChange={this.handleChange}
          handleOnClick={this.handleOnClick}
          handleRandomSelection={this.handleRandomSelection}
          id={this.state.product.id}
          price={this.state.product.price}
          name={this.state.product.name} />
      </main>
    );
  }
}

export default Home;
