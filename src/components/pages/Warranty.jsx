/*
=====================================================
OMEGA19 Page
Warranty
=====================================================
*/

import React, { Component } from "react";
import Template from "../Template";

/* STATIC RESOURCES */
import for_life_image from "../../static/img/for-life.png";

class Warranty extends Component {
  render() {
    return (
      <Template>
        <div className="grid-container warranty-page">
          <div className="grid-x grid-padding-x">
            <div className="small-12 large-12 cell text-center">
              <h1>Warranty</h1>
            </div>
            <div className="small-12 large-8 large-offset-2 cell">
              <div className="text-center">
                <img src={for_life_image} alt="Head Down Firearms For Life" />
              </div>
              <p>
                Head Down Firearms is proud to offer a transferable lifetime
                warranty on all HD-15 rifles and pistols. We will fix or replace
                any rifle which doesn't meet our factory standards. We warranty
                our work to be free from defect in the manufacturing process.
              </p>
              <p>
                We are NOT Head Down Products. If you own a Head Down Products
                rifle or pistol, we did not manufacture it. Consequently, we do
                not warranty the work of that company.
              </p>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

export default Warranty;
