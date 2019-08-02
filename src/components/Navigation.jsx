/*
=====================================================
OMEGA19 Object
Navigation Bar
=====================================================
*/

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/* STATIC RESOURCES */
import logo from '../static/img/logo.png';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: this.props.disableSearchBar ? false : true,
      stylingHeader: (this.props.solid ? "header header-solid" : "header") + (this.props.sticky ? " sticky" : ""),
      showMenu: false,
      isLoggedIn: false,
      searchQuery: ""
    }
    if(this.props.searchBar == false) {
      this.setState({
        searchBar: false
      });
    }

    global.API.dashboard().then(
      (success) => {
        const code = parseInt(success.Result.code);
        console.log(code);
        console.log(success);
        if(code == 200) {
          this.setState({
            isLoggedIn: true
          });
        }
      },
      (error) => {}
    );

    global.API.getCart().then(
      (success) => {
        console.log(success);
        try {
          let amountOfItems = success.Result.Response.data.line_items.physical_items.length;
          this.setState({
            cartQuantity: amountOfItems
          });
        } catch(e) {
          console.log(e);
        }
        
      },
      (error) => {}
    );
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
  }
  componentDidMount() {
    
  }

  handleMenuClick() {
    const currentStatus = this.state.showMenu;
    this.setState({
      showMenu: !currentStatus
    });
  }

  handleSearchBarChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }

  handleSearchBarSubmit() {
    if(this.state.searchQuery.length > 0) {
      window.location = "/search/" + encodeURIComponent(this.state.searchQuery);
    }
  }

  handleSearchBarKeyDown(e) {
    if(e.charCode === 13) {
      this.handleSearchBarClick();
    }
  }

  renderSearchBar() {
    if(this.state.searchBar) {
      return (
        <div className="search-bar">
          <input onChange={this.handleSearchBarChange} placeholder="Search..." type="text"></input>
          <i onClick={() => this.handleSearchBarSubmit()} onKeyDown={(e) => this.handleSearchBarKeyDown(e)} className="fas fa-search"></i>
        </div>
      );
    }
  }

  renderMobileMenu() {
    if(this.state.showMenu) {
      return (
        <div className="nav-mobile-menu">
          <ul>
            {this.renderSearchBar()}
            {this.props.children}
            {this.renderUserFunctions()}
          </ul>
        </div>
      );
    }
  }

  renderUserFunctions() {
    if(this.state.isLoggedIn) {
      return (
        <div>
          <a href="/logout"><li><i className="fas fa-sign-out-alt"></i> Sign Out</li></a>
          <a href="/cart"><li><i className="fas fa-shopping-cart"></i>{this.state.cartQuantity ? this.state.cartQuantity : ""} <p className="inline desktop-hidden">Cart</p></li></a>
        </div>
      );
    } else {
      return (
        <div>
          <a href="/register"><li>Sign Up</li></a>
          <a href="/login"><li>Login</li></a>
          <a href="/cart"><li><i className="fas fa-shopping-cart"></i>{this.state.cartQuantity ? this.state.cartQuantity : ""} <p className="inline desktop-hidden">Cart</p></li></a>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Navigation">
        <div className="nav-desktop">
          <div className={this.props.sticky ? "color-bar sticky" : "color-bar"}></div>
          <div className={this.state.stylingHeader}>
              <Link to="/">
                  <img id="Logo" src={logo}/>
              </Link>
              <div className="nav-bar left">
                  {this.renderSearchBar()}
                  <ul>
                      {this.props.children}
                  </ul>
              </div>  
              <div className="nav-bar right">
                  <ul>
                      {this.renderUserFunctions()}
                  </ul>
              </div>  
          </div>
        </div>
        
        <div className={"nav-mobile" + (this.props.solid ? " nav-mobile-solid" : "")}>
          <div className={this.props.sticky ? "color-bar sticky" : "color-bar"}></div>
          <div className="nav-mobile-content">
            <a href="/">
              <img id="Logo" src={logo}/>
            </a>
            <i onClick={() => this.handleMenuClick()} className={"fas fa-bars nav-hamburger" + (this.state.showMenu ? " nav-hamburger-active" : "")}></i>
          </div>
          {this.renderMobileMenu()}
        </div>
      </div>
    );
  } 
}