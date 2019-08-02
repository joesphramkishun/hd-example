/*
=====================================================
OMEGA19 Object
Collection Spotlight
=====================================================
*/

import React from 'react';
import ProductItem from './ProductItem';

export default class SearchConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        query: this.props.query,
        hasQuery: this.props.query > 0 ? true : false,
        isLoaded: false,
        products: []
    }
    this.renderProducts = this.renderProducts.bind(this);
  }
  
  componentDidMount() {
    console.log(this.state.query);
    global.API.searchProducts(this.state.query).then(
        (success) => {
            console.log(success.data);
            this.setState({
                products: success.data,
                isLoaded: true
            });
        },
        (error) => {}
    );
  }

  renderProducts() {
      let components = [];
      if(this.state.isLoaded) {
        if(this.state.products.length > 0) {
            for(var product of this.state.products) {
                let slug = global.API.tools.toSlug(product.id, product.name);
                components.push(
                    <ProductItem collection key={product.id} title={product.name} price={product.price} image={product.images.length > 0 ? product.images[0].url_standard : ""} link={"/product/" + slug}/>
                );
            }
        }
      }
      return components;
  }

  render() {
    return (
      <div className="SearchConstructor">
        <div className="page">
            <h1>Search results for "{this.state.query}"</h1>
            <div className="product-item-container">
                {this.renderProducts()}
                <div className="clearfix"></div>
            </div>
        </div>
      </div>
    );
  }
}