/*
=====================================================
OMEGA19 Page
FAQ
=====================================================
*/

import React, { Component } from "react";
import Template from "../Template";
import { Link } from "react-router-dom";

class FAQ extends Component {
  render() {
    return (
      <Template>
        <div className="grid-container">
          <div className="grid-x">
            <div className="small-12 large-10 large-offset-1 cell">
              <div className="faq-container">
                <h1 className="text-center">FAQ</h1>

                <div className="faq-wrapper">
                  <div className="faq-item-container">
                    <h2>Q: FFL regulations</h2>
                    <p>
                      A: A Federal Firearms License is a license in the United
                      States that enables an individual or a company to engage
                      in a business pertaining to the manufacture or importation
                      of firearms and ammunition, or the interstate and
                      intrastate sale of firearms. We only sell and ship to FFL
                      holders
                    </p>
                  </div>

                  <div className="faq-item-container">
                    <h2>Q: How do I make a return?</h2>
                    <p>
                      A: You may return most new, unopened items within 30 days
                      of delivery for a full refund except for firearms. We'll
                      also pay the return shipping costs if the return is a
                      result of our error (you received an incorrect or
                      defective item, etc.).&nbsp;
                      <Link to={`/shipping-returns`}>
                        Click here to read our full Return Policy
                      </Link>
                      .
                    </p>
                    <p>
                      You should expect to receive your refund within four weeks
                      of giving your package to the return shipper, however, in
                      many cases you will receive a refund more quickly. This
                      time period includes the transit time for us to receive
                      your return from the shipper (5 to 10 business days), the
                      time it takes us to process your return once we receive it
                      (3 to 5 business days), and the time it takes your bank to
                      process our refund request (5 to 10 business days).
                    </p>
                    <p>
                      If you need to return an item, please Contact Us with your
                      order number and details about the product you would like
                      to return. We will respond quickly with instructions for
                      how to return items from your order.
                    </p>
                  </div>

                  <div className="faq-item-container">
                    <h2>Q: Where do you ship to?</h2>
                    <p>
                      A: We can ship to virtually any address in the world. Note
                      that there are restrictions on some products, and some
                      products cannot be shipped to international destinations
                      outside of the United States.
                    </p>
                    <p>
                      When you place an order, we will estimate shipping and
                      delivery dates for you based on the availability of your
                      items and the shipping options you choose. Depending on
                      the shipping provider you choose, shipping date estimates
                      may appear on the shipping quotes page.
                    </p>
                    <p>
                      Please also note that the shipping rates for many items we
                      sell are weight-based. The weight of any such item can be
                      found on its detail page. To reflect the policies of the
                      shipping companies we use, all weights will be rounded up
                      to the next full pound.
                    </p>
                  </div>

                  <div className="faq-item-container">
                    <h2>Q: What's your privacy policy?</h2>
                    <p>
                      A: At hdfirearms.com, one of our main priorities is the
                      privacy of our visitors. This Privacy Policy document
                      contains types of information that is collected and
                      recorded by hdfirearms.com and how we use it.
                    </p>
                    <p>
                      If you have additional questions or require more
                      information about our Privacy Policy, do not hesitate to
                      contact us through email at{" "}
                      <a href="mailto:hdsales@hdfirearms.com">
                        hdsales@hdfirearms.com
                      </a>
                      .&nbsp;
                      <Link to={`/privacy`}>
                        Click here to read the full privacy policy.
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

export default FAQ;
