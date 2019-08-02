/*
=====================================================
OMEGA19 Page
Checkout
=====================================================
*/

import React from 'react';
import Template from '../Template';

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state_or_province: "",
            state_or_province_code: "",
            country_code: "",
            card_number: "",
            card_holder_name: "",
            expiry_month: "",
            expiry_year: "",
            verification_value: "",

            billing_address1: "",
            billing_address2: "",
            billing_city: "",
            billing_postal_code: "",
            billing_state: "",
            billing_state_code: "",
            billing_country_code: "",

            items: [],
            currency: "",
            taxIncluded: false,
            subtotal: 0,
            total: 0,

            isError: false,
            error: ""
        };
        global.API.getCart().then(
            (success) => {
                console.log(success);
                try {
                    let data = success.Result.Response.data;
                    this.setState({
                        currency: data.currency.code,
                        taxIncluded: data.tax_included,
                        items: data.line_items.physical_items,
                        subtotal: parseFloat(data.base_amount).toFixed(2),
                        total: parseFloat(data.cart_amount).toFixed(2),
                        isLoaded: true
                    });
                } catch(e) {

                }
            },
            (error) => {}
        );
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCopyClick = this.handleCopyClick.bind(this);
    }
    handleChange(e) {
        const { name, type, value, id } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [id]: val });
    }
    handleSubmit() {
        let content = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state_or_province: this.state.state_or_province,
            state_or_province_code: this.state.state_or_province_code,
            country_code: this.state.country_code,
            billing_address1: this.state.billing_address1,
            billing_address2: this.state.billing_address2,
            billing_city: this.state.billing_city,
            billing_postal_code: this.state.billing_postal_code,
            billing_state: this.state.billing_state,
            billing_state_code: this.state.billing_state_code,
            billing_country_code: this.state.billing_country_code,
            card_number: this.state.card_number,
            card_holder_name: this.state.card_holder_name,
            expiry_month: this.state.expiry_month,
            expiry_year: this.state.expiry_year,
            verification_value: this.state.verification_value
        }
        // global.API.checkout(content).then(
        //     (success) => {
        //         console.log(success);
        //     },
        //     (error) => {
        //         console.log("error");
        //         console.log(error);
        //     }
        // );
        window.location = "/thank-you";
    }
    handleCopyClick() {
        console.log("clicked!");
        this.setState((state, props) => ({
            billing_address1: state.address1,
            billing_address2: state.address2,
            billing_city: state.city,
            billing_postal_code: state.state_or_province_code,
            billing_state: state.state_or_province,
            billing_state_code: state.state_or_province,
            billing_country_code: state.country_code,
        }));
    }
    render() {
        return (
            <Template>
                <div className="Checkout page">
                    
                    <form className="checkout">
                        <h1>Check Out</h1>
                        <h4>Shipping & Info</h4>
                        <input id="fname" type="text" onChange={this.handleChange} placeholder="First name" className="desktop-half mobile-whole left"></input>

                        <input id="lname" type="text" onChange={this.handleChange} placeholder="Last name" className="desktop-half mobile-whole left"></input>
                        <br/>

                        <input id="email" type="text" onChange={this.handleChange} placeholder="E-mail address" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="address1" type="text" onChange={this.handleChange} placeholder="Address 1" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="address2" type="text" onChange={this.handleChange} placeholder="Address 2" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="city" type="text" onChange={this.handleChange} placeholder="City" className="desktop-quarter mobile-whole left"></input>
                        <br/>

                        <input id="state_or_province" onChange={this.handleChange} type="text" placeholder="State" className="desktop-quarter mobile-whole left"></input>
                        <br/>

                        <input id="state_or_province_code" onChange={this.handleChange} type="text" placeholder="Zip Code" className="desktop-quarter mobile-whole left"></input>
                        <br/>

                        <input id="country_code" type="text" onChange={this.handleChange} placeholder="Country" className="desktop-quarter mobile-whole right"></input>
                        <br/>

                        <div className="button button-login" id="copy-to-billing" onClick={() => this.handleCopyClick()}>Copy shipping address to billing</div>

                        <h4>Billing Address</h4>
                        <input id="billing_address1" type="text" onChange={this.handleChange} placeholder="Address 1" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="billing_address2" type="text" onChange={this.handleChange} placeholder="Address 2" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="billing_city" type="text" onChange={this.handleChange} placeholder="City" className="desktop-quarter mobile-whole left"></input>

                        <input id="billing_state_or_province" type="text" onChange={this.handleChange} placeholder="State" className="desktop-quarter mobile-whole left"></input>

                        <input id="billing_state_or_province_code" type="text" onChange={this.handleChange} placeholder="Zip Code" className="desktop-quarter mobile-whole left"></input>

                        <input id="billing_country_code" type="text" onChange={this.handleChange} placeholder="Country" className="desktop-quarter mobile-whole right"></input>
                        <br/>


                        <h4>Payment</h4>
                        <input id="card_number" type="text" onChange={this.handleChange} placeholder="Card Number" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="card_holder_name" type="text" onChange={this.handleChange} placeholder="Cardholder Name" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="expiry_month" type="text" onChange={this.handleChange} placeholder="Expiry Month" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="expiry_year" type="text" onChange={this.handleChange} placeholder="Expiry Year" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <input id="verification_value" onChange={this.handleChange} type="text" placeholder="CVV" className="desktop-whole mobile-whole left"></input>
                        <br/>

                        <div>
                            <p>Grand Total: ${this.state.total}</p>
                        </div>

                        <div onClick={this.handleSubmit} className="button button-login">Check Out</div>
                        <div className="clearfix"></div>
                    </form>
                </div>
            </Template>
        );
    }
}