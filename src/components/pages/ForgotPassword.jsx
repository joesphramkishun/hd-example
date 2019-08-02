/*
=====================================================
OMEGA19 Page
Forgot Password
=====================================================
*/

import React from 'react';
import Template from '../Template';

import Logo from '../../static/img/dark-logo.png';

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isError: false,
            error: "",
            isMessage: false,
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, type, value } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [name]: val });
    }
    handleSubmit() {
        if(this.state.email.length > 5) {
            global.API.postForgotPassword(this.state.email).then(
                (success) => {
                    this.setState((state, props) => ({
                        isMessage: true,
                        message: "An message has been sent to " + state.email + " with a temporary password that can be used to login. After logging in you can change your password."
                    }));
                },
                (error) => {}
            );
        }
    }
    renderMessage() {
        if(this.state.isMessage) {
            return (
                <div className="large-12 cell">
                    <div className="message">
                        {this.state.message}
                    </div>
                </div>
            );
        } else if(this.state.isError){
            return (
                <div className="large-12 cell">
                    <div className="message error">
                        {this.state.message}
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <Template>
                <div className="grid-container page signup">
                    <div className="grid-x">
                        <div className="small-12 large-6 cell content-wrap">
                        <section className="signup login">
                            <form>
                            <div className="grid-container signup-grid">
                                <div className="grid-x grid-padding-x">
                                <div className="large-12 cell">
                                    <h3 className="form-header">
                                    Forgot Password
                                    </h3>
                                </div>
                                <div className="large-12 cell">
                                    If your e-mail address is in the system, we will send an e-mail with a temporary password that you can use to sign in.
                                </div>
                                <div className="large-12 cell">
                                    <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    onChange={this.handleChange}
                                    style={{margin: "13px 0px 0px 0px"}}
                                    />
                                </div>
                                {this.renderMessage()}
                                <div className="large-12 cell">
                                    <div onClick={() => this.handleSubmit()} id="loginBtn" className="button expanded cta-main button-login">
                                        Request Password
                                    </div>
                                </div>
                                </div>
                            </div>
                            </form>
                        </section>
                        </div>
                        <div className="large-6 cell content-wrap image-container login-image">
                        <img src={Logo} alt="Log In" />
                        </div>
                    </div>
                    </div>
            </Template>
        );
    }
}