/*
=====================================================
OMEGA19 Page
Shipping & Returns
=====================================================
*/

import React, { Component } from "react";
import Template from "../Template";
import { Link } from "react-router-dom";

class ShippingReturns extends Component {
  render() {
    return (
      <Template>
        <div className="grid-container shipping-returns-page">
          <div className="grid-x grid-padding-x">
            <div className="small-12 large-12 cell text-center">
              <h1>Shipping and Returns</h1>
            </div>
            <div className="small-12 large-8 large-offset-2 cell">
              <div className="item">
                <h2>Returns Policy</h2>
                <p>
                  You may return most new, unopened items within 30 days of
                  delivery for a full refund except for firearms. We'll also pay
                  the return shipping costs if the return is a result of our
                  error (you received an incorrect or defective item, etc.).
                </p>
                <p>
                  You should expect to receive your refund within four weeks of
                  giving your package to the return shipper, however, in many
                  cases you will receive a refund more quickly. This time period
                  includes the transit time for us to receive your return from
                  the shipper (5 to 10 business days), the time it takes us to
                  process your return once we receive it (3 to 5 business days),
                  and the time it takes your bank to process our refund request
                  (5 to 10 business days).
                </p>
                <p>
                  If you need to return an item, please
                  <Link to={`/contact`}> Contact Us </Link>
                  with your order number and details about the product you would
                  like to return. We will respond quickly with instructions for
                  how to return items from your order.
                </p>
              </div>

              <div className="item">
                <h2>Shipping</h2>
                <p>
                  We can ship to virtually any address in the world. Note that
                  there are restrictions on some products, and some products
                  cannot be shipped to international destinations outside of the
                  United States.
                </p>
                <p>
                  When you place an order, we will estimate shipping and
                  delivery dates for you based on the availability of your items
                  and the shipping options you choose. Depending on the shipping
                  provider you choose, shipping date estimates may appear on the
                  shipping quotes page.
                </p>
                <p>
                  Please also note that the shipping rates for many items we
                  sell are weight-based. The weight of any such item can be
                  found on its detail page. To reflect the policies of the
                  shipping companies we use, all weights will be rounded up to
                  the next full pound.
                </p>
              </div>

              <div className="item">
                <h2>FFL Regulations</h2>
                <p>
                  We only sell and ship to FFL holders. Federal Firearms License
                  is a license in the United States that enables an individual
                  or a company to engage in a business pertaining to the
                  manufacture or importation of firearms and ammunition, or the
                  interstate and intrastate sale of firearms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

export default ShippingReturns;
