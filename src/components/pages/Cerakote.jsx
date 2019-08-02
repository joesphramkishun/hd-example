/*
=====================================================
OMEGA19 Page
Cerakote
=====================================================
*/

import React, { Component } from "react";
import Template from "../Template";

/* STATIC RESOURCES */
import cerakote_logo from "../../static/img/Cerakote.jpg";
import woodland_camo from "../../static/img/woodland_camo.jpg";
import star_spangled_awesome from "../../static/img/star_spangled_awesome.jpg";

class Cerakote extends Component {
  render() {
    return (
      <Template>
        <div className="grid-container cerakote-page">
          <div className="grid-x grid-padding-x">
            <div className="small-12 large-12 cell text-center">
              <h1>Cerakote</h1>
            </div>
            <div className="small-12 large-8 large-offset-2 cell text-center">
              <img
                src={cerakote_logo}
                alt="Cerakote"
                className="cerakote-logo"
              />
              <h2 className="text-center">
                We are a Factory Trained and Certified Cerakote Provider.
              </h2>
            </div>

            <div class="small-12 large-6 cell featured-product">
              <img src={woodland_camo} alt="Woodland Camo" />
            </div>

            <div class="small-12 large-6 cell featured-product">
              <img src={star_spangled_awesome} alt="Star Spangled Awesome" />
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

export default Cerakote;
