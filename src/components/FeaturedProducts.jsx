/*
=====================================================
OMEGA19 Object
Featured Products
=====================================================
*/

import React from 'react';
import ProductItem from './ProductItem';
import ProductImage1 from '../static/img/rogueshops.png';

export default class FeaturedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productGlobalWidth: "mobile-whole",
      productWidth: "desktop-quarter",
      isLoaded: false,
      products: [],
      limit: this.props.limit ? this.props.limit : 4
    };

    if(this.props.collectionID) {
      global.API.getSimpleProducts().then(
        (success) => {
          console.log(success);
          this.setState({
            products: success,
            isLoaded: true
          });
        },
        (error) => {
  
        }
      );
    }
  }

  renderSampleProducts() {
    let count = React.Children.count(this.props.children);
    if(count == 1) {
      this.state.productWidth = "desktop-whole";
    } else if(count == 2) {
      this.state.productWidth = "desktop-half";
    } else if(count == 3) {
      this.state.productWidth = "desktop-third";
    } else if(count > 3) {
      this.state.productWidth = "desktop-quarter";
    }

    let ret = [];
    let classes = this.state.productGlobalWidth + " " + this.state.productWidth;
    let sampleProduct = (
        <ProductItem className={classes} title="RogueV2 Android Smart Watch (46mm)" price="$75.99" image={ProductImage1} link="/product/test">
        </ProductItem>
    );
    for(var i = 0; i < count; i++) {
      ret.push(sampleProduct);
    }

    return ret;
  }

  renderProducts() {
    if(this.props.sample) {
      return this.renderSampleProducts();
    } else if(this.state.isLoaded) {
      let products = [];
      let limit = (this.state.limit < this.state.products.length ? this.state.limit : this.state.products.length);
      for(var i = 0; i < limit; i++) {
        let data = this.state.products[i];
        products.push(
          <ProductItem key={i} title={data.title} price={data.price} image={data.image} link={"/product/" + data.slug}/>
        );
      }

      return products;
    } else if(this.props.useChildren) {
      return this.props.children;
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
        <div className="FeaturedProducts">
          <div className="section product-section">
            <h1 className="product-section-title text-center">{this.props.title ? this.props.title : "Untitled"}</h1>
            <div className={this.props.center ? "product-item-container product-item-container__center" : "product-item-container"}>
              {this.renderProducts()}
            </div>
        </div>
      </div>    
    );
  }
}