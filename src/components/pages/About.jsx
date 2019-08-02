/*
=====================================================
OMEGA19 Page
About
=====================================================
*/

import React, { Component } from "react";
import Template from "../Template";

class About extends Component {
  render() {
    return (
      <Template>
        <div className="grid-container about-page">
          <div className="grid-x grid-padding-x">
            <div className="small-12 large-12 cell text-center">
              <h1>About Us</h1>
            </div>
            <div className="small-12 large-8 large-offset-2 cell">
              <p>
                With countless products on the market today it's hard to
                determine what products are worth buying. In order to provide
                you with the best experience possible, each and every piece of
                gear listed on our site has been field tested by our Head Down
                staff. If it doesn't pass our rigorous field testing process you
                won't see it on our site. We do the work so you don't have to.
              </p>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

export default About;
