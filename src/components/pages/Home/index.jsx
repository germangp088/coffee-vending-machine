import React from 'react';
import { FormHelperText } from '@material-ui/core';
import { getProducts } from "../../../request";
import Loading from '../../common/Loading';
import MuiAlert from '@material-ui/lab/Alert';
import VendingMachine from './VendingMachine';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      product: { price: 0},
      loading: true,
      errorMessage: '',
      notFound: false
    };
    this.getProducts = this.getProducts.bind(true);
    this.handleChange = this.handleChange.bind(true);
  }

  componentDidMount= async() => {
    await this.getProducts();
  }

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

  handleChange = (event) => {
    console.log(event.target.value)
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
        <VendingMachine products={this.state.products}
          handleChange={this.handleChange}
          id={this.state.product.id}
          price={this.state.product.price} />
      </main>
    );
  }
}

export default Home;