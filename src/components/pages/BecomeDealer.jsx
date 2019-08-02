/*
=====================================================
OMEGA19 Page
BecomeDealer
=====================================================
*/

import React, { Component } from "react";
import Template from "../Template";

class BecomeDealer extends Component {
  render() {
    return (
      <Template>
        <div className="grid-container become-dealer-page">
          <div className="grid-x grid-padding-x">
            <div className="small-12 large-12 cell text-center">
              <h1>Become A Dealer</h1>
            </div>
            <div className="small-12 large-8 large-offset-2 cell">
              <p>
                If you would like to become a dealer of our products please
                submit a copy of your FFL and SOT if applicable along with a
                copy of your current business license to&nbsp;
                <a href="mailto:hdsales@hdfirearms.com">
                  hdsales@hdfirearms.com
                </a>
                .
              </p>

              <p>
                <strong>
                  Why Become A Stocking Dealer For Head Down Firearms?
                </strong>
              </p>

              <ul>
                <li>We're NOT Head Down Products.</li>
                <li>We help drive business to your store!</li>
                <li>
                  We give you the healthiest margins in the industry with the
                  LOWEST Master Dealer entry fee.
                </li>
                <li>We also work with Buy Groups.</li>
                <li>We protect our MAP pricing.</li>
                <li>Our guns look better. Our guns shoot better.</li>
                <li>Our guns are completely manufactured in the USA.</li>
                <li>Our guns have a transferable Lifetime Warranty.</li>
                <li>
                  We can tailor inventory for your business which cannot be
                  shopped elsewhere.
                </li>
              </ul>

              <p>
                <strong>
                  How to place your order with us for the first time:
                </strong>
              </p>

              <ol>
                <li>
                  Contact us at <a href="tel:7704857015">770-485-7015</a> to get
                  your Dealer account approved.
                </li>
                <li>
                  Email a copy of your FFL/SOT to us{" "}
                  <a href="mailto:hdsales@hdfirearms.com">
                    hdsales@hdfirearms.com
                  </a>
                  .
                </li>
                <li>
                  Once your account has been approved, your online account will
                  allow you to purchase our product at dealer or Buy Group
                  price. Our office will also email you a dealer package for
                  placing bulk orders.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

export default BecomeDealer;
