import React from 'react';
import { FormHelperText } from '@material-ui/core';
import { getProducts, postCash } from "../../../request";
import Loading from '../../common/Loading';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import VendingMachine from './VendingMachine';
import Typography from '@material-ui/core/Typography';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      product: { id: '', price: 0 },
      loading: true,
      success: false,
      errorMessage: '',
      notFound: false
    };
    this.getProducts = this.getProducts.bind(true);
    this.handleChange = this.handleChange.bind(true);
    this.handleOnClick = this.handleOnClick.bind(true);
  }

  componentDidMount= async() => {
    await this.getProducts();
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
      const products = await getProducts();
      this.setState({
        products: products,
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
        product: { id: '', price: 0 },
        loading: false,
        success: true
      });
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
        <VendingMachine products={this.state.products}
          handleChange={this.handleChange}
          handleOnClick={this.handleOnClick}
          id={this.state.product.id}
          price={this.state.product.price} />
      </main>
    );
  }
}

export default Home;