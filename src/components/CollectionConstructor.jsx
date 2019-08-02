/*
=====================================================
OMEGA19 Object
Collection Constructor
=====================================================
*/

import React from 'react';
import ProductItem from './ProductItem';
import ProductImage1 from '../static/img/rogueshops.png';

export default class CollectionConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: {},
      isProductsLoaded: false,
      isProductImagesLoaded: false,
      isCategoriesLoaded: false,
      isError: false,
      title: "",
      id: this.props.id ? this.props.id : -1,
      rawProducts: [],
      rawCategories: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  renderLoading() {
    if(!this.state.isProductsLoaded) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  }

  productStripper(items) {
    var stringSanitizer = require("string-sanitizer");
    let data = [];
    let products = items;

    for(var i = 0; i < products.length; i++) {
      const indexItem = products[i];
      let item = {
        id: indexItem.id,
        title: indexItem.name,
        price: indexItem.price,
        slug: stringSanitizer.sanitize.addDash(indexItem.id + " " + indexItem.name),
        image: ""
      }
      if(indexItem.images.length > 0) {
        item.image = indexItem.images[0].url_standard;
      }
      data.push(item);
    }
    return data;
  }

  componentDidMount() {
    if(this.props.id == "all") {
      global.API.getProducts().then(
        (success) => {
          console.log(success.data.data);
          let items = this.productStripper(success.data.data);
          this.setState({
            rawProducts: success.data.data,
            products: items,
            title: "All Products",
            isProductsLoaded: true
          });
        },
        (error) => {}
      );
    } else {
      // gets products
      global.API.getProducts().then(
        (success) => {
          var preItems = [];
          var id = this.state.id;
          preItems = success.data.data;
          console.log(preItems);

          var postItems = preItems.filter(function(a) {
            if(a.categories.length > 0) {
              var found = a.categories.includes(id);
              if(found) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          });
          console.log(preItems);
          console.log(postItems);
          let items = this.productStripper(postItems);
          this.setState({
            rawProducts: success.data.data,
            products: items,
            title: this.props.title,
            isProductsLoaded: true
          });
        },
        (error) => {}
      );
    }
  }

  shouldComponentUpdate() {
    return true;
  }
  
  renderProducts() {
    var stringSanitizer = require("string-sanitizer");

    let products = [];
    let DOMitems = [];

    if(this.state.isProductsLoaded == true) {
      let products = this.state.products;
      for(var i = 0; i < products.length; i++) {
        const title = products[i].title;
        const price = products[i].price;
        const image = products[i].image;
        const slug = products[i].slug;
        const id = products[i].id;

        DOMitems.push(
          <ProductItem collection key={id} title={title} price={price} image={image} link={"/product/" + slug}/>
        );
      }
    }
    return DOMitems;
  }

  filterChanged(e) {
    const value = e.target.value;
    if(this.state.isProductsLoaded) {
      let products = this.state.products;

      if(value == "price-low-to-high") {
        products.sort(
          function(a, b) {
            return a.price > b.price ? 1 : -1;
          }
        );
      } else if(value == "price-high-to-low") {
        products.sort(
          function(a, b) {
            return a.price < b.price ? 1 : -1;
          }
        );
      } else if(value == "a-z") {
        products.sort(
          function(a, b) {
            let nameA = String(a.title).toLowerCase().trim();
            let nameB = String(b.title).toLowerCase().trim();
            return nameA > nameB ? 1 : -1;
          }
        );
      } else if(value == "z-a") {
        products.sort(
          function(a, b) {
            let nameA = String(a.title).toLowerCase().trim();
            let nameB = String(b.title).toLowerCase().trim();
            return nameA < nameB ? 1 : -1;
          }
        );
      }

      this.setState({
        products: products
      });
    }
  }
  render() {
    return (
        <div className="CollectionConstructor collection page">
            <div className="desktop-quarter mobile-whole left">
                <h1>{this.state.title}</h1>
                <label htmlFor="collection-filter">Sort By</label>
                <select id="collection-filter" onChange={(e) => this.filterChanged(e)} className="collection-filter-select">
                    <option value="best-selling">Best selling</option>
                    <option value="best-rating">Best rating</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="price-low-to-high">Price: Low to High</option>
                    <option value="price-high-to-low">Price: High to Low</option>
                    <option value="date-newest-first">Date: Newest first</option>
                    <option value="date-oldest-first">Date: Oldest first</option>
                </select>
            </div>
            <div className="desktop-three-quarters mobile-whole right product-item-container">
              {this.renderLoading()}
              {this.renderProducts()}
            </div>
            <div className="clearfix"></div>
        </div>
    );
  }
}