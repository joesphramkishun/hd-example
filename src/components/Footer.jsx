/*
=====================================================
OMEGA19 Object
Footer
=====================================================
*/

import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="footer">
            <div className="footer-chunk footer-chunk-1 desktop-third mobile-whole">
                <img src={this.props.image} className="footer-logo"/>
                <b><h4>Contact Us</h4></b>
                <p>Phone: <a href="tel:7704857015">770.485.7015</a></p>
                <p>E-mail: <a href="mailto:HDSales@hdfirearms.com">HDSales@hdfirearms.com</a></p>
            </div>
            <div className="footer-chunk desktop-third mobile-whole footer-links">
                <a href="/">Shop</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/faq">FAQ</a>
                <a href="/warranty">Warranty</a>
                <a href="/privacy">Privacy</a>
                <a href="/shipping-returns">Shipping and Returns</a>
                <a href="/cerakote">Cerakote</a>
            </div>
            <div className="footer-chunk desktop-third mobile-whole">
                <h2>Follow Us</h2>
                <div className="footer-social-links">
                    <a
                        className="footer-social-facebook"
                        href="https://www.facebook.com/headdownarms/"
                        target="_blank"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        className="footer-social-twitter"
                        href="https://twitter.com/headdownarms"
                        target="_blank"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        className="footer-social-instagram"
                        href="https://www.instagram.com/headdownarms/"
                        target="_blank"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a
                        className="footer-social-linkedin"
                        href="https://www.linkedin.com/company/headdownarms/"
                        target="_blank"
                    >
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a
                        className="footer-social-pinterest"
                        href="https://www.pinterest.com/headdownarms/"
                        target="_blank"
                    >
                        <i className="fab fa-pinterest"></i>
                    </a>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    );
  }
}