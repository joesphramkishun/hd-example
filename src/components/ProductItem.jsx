/*
=====================================================
OMEGA19 Component
Product Item
=====================================================
*/

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NoImage from '../static/img/no-image.png';

export default class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      productImageStyling: {
        backgroundImage: 'url(' + (this.props.image ? this.props.image : NoImage) + ')'
      },
      classes: "ProductItem product-item",
      size: "desktop-quarter mobile-whole",
      price: "$" + parseFloat(this.props.price).toFixed(2)
    }
  }
  calculateClasses() {
    if(this.props.className) {
      this.state.size = this.props.className;
    }
    return this.state.classes + " " + this.state.size;
  }
  didComponentMount() {
    
  }
  renderSoldOut() {
    let ret = (
      <div className="sold-out">Sold Out</div>
    );
    if(this.props.soldOut) {
      return ret;
    }
  }
  render() {
    return (
      <div className={this.calculateClasses()}>
        <a href={this.props.link}>
          <div className={"product-item-box" + (this.props.collection ? " product-item-box__collection" : "")}>
              <div className="product-item__image" style={this.state.productImageStyling}></div>
              <div className="product-item__details">
                  <p className="product-item__title">{this.props.title}</p>
                  <p className="product-item__price">{this.state.price} {this.renderSoldOut()}</p>
              </div>
          </div>
        </a>
      </div>
    );
  }
}