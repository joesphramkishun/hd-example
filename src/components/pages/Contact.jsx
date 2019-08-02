/*
=====================================================
OMEGA19 Page
Contact
=====================================================
*/

import React from "react";
import Template from "../Template";
import { Link } from "react-router-dom";

/* STATIC RESOURCES */
import dark_logo from "../../static/img/dark-logo.png";

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    document.body.classList.add("signup-page");
  }

  componentWillUnmount() {
    document.body.classList.remove("signup-page");
  }

  render() {
    return (
      <Template>
        <div className="grid-container page-content signup-wrapper">
          <div className="grid-x">
            <div className="small-12 large-8 large-offset-2 cell content-wrap">
              <section className="signup login">
                <form>
                  <div className="grid-container signup-grid">
                    <div className="grid-x grid-padding-x">
                      <div className="large-12 cell">
                        <img
                          src={dark_logo}
                          className="contact-logo"
                          alt="Head Down Firearms"
                        />

                        <h3 className="form-header text-center">Contact Us</h3>
                        <p>
                          We're happy to answer questions or help you with
                          exchanges or warranty issues. Please fill out the form
                          below if you need assistance.
                        </p>
                        <p>
                          OFFICE: <a href="tel:7704857015">(770) 485-7015</a>
                          <br />
                          333 Butler Industrial Drive
                          <br />
                          Dallas, GA 30132
                        </p>
                      </div>
                      <div className="large-12 cell">
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          placeholder="First Name"
                          required
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="large-12 cell">
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          placeholder="Last Name"
                          required
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="large-12 cell">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email address"
                          required
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="large-12 cell">
                        <input
                          type="text"
                          id="order_number"
                          name="order_number"
                          placeholder="Order Number"
                          required
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="large-12 cell">
                        <input
                          type="text"
                          id="company_name"
                          name="company_name"
                          placeholder="Company Name"
                          required
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="large-12 cell">
                        <input
                          type="text"
                          id="rma_number"
                          name="rma_number"
                          placeholder="RMA Number"
                          required
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="large-12 cell">
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Message"
                          required
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="large-12 cell">
                        <Link to={`/`}>
                          <div
                            id="submitContact"
                            className="button expanded cta-main"
                          >
                            SUBMIT
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}
