/*
=====================================================
OMEGA19 Page
Register
=====================================================
*/

import React from 'react';
import Template from '../Template';

import Logo from '../../static/img/dark-logo.png';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            password: "",
            isError: false,
            error: "",
            isMessage: false,
            message: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, type, value } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [name]: val });
    }
    handleSubmit() {
        global.API.register(
            this.state.fname,
            this.state.lname,
            this.state.email,
            this.state.phone,
            this.state.password,
        )
        .then(
            (success) => {
                console.log(success);
                if(success.Result.code == "200") {
                    this.setState({
                        isMessage: true,
                        isError: false,
                        message: "Successfully registered."
                    });
                } else if(success.Result.code == "500") {
                    this.setState({
                        isError: true,
                        isMessage: false,
                        message: "E-mail may already be registered or a field is empty."
                    });
                }
            },
            (error) => {
                console.log("error");
                console.log(error);
            }
        );
    }
    renderError() {

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
                                    Sign Up
                                    </h3>
                                </div>
                                <div className="large-12 cell">
                                    <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    placeholder="First Name"
                                    required
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="large-12 cell">
                                    <input
                                    type="text"
                                    id="lname"
                                    name="lname"
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
                                    placeholder="Email Address"
                                    required
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="large-12 cell">
                                    <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="large-12 cell">
                                    <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={this.handleChange}
                                    />
                                </div>
                                {this.renderMessage()}
                                <div className="large-12 cell">
                                    <a href="#" onClick={this.handleSubmit}>
                                    <div id="loginBtn" className="button expanded cta-main button-login">
                                        Register
                                    </div>
                                    </a>
                                </div>
                                <div style={{textAlign: 'right'}} className="large-12 cell">
                                    <a href={`/forgot`}>
                                    <div id="resetBtn">Forgot Password</div>
                                    </a>
                                </div>
                                </div>
                            </div>
                            </form>
                        </section>
                        </div>
                        <div className="large-6 cell content-wrap image-container login-image">
                        <img src={Logo} alt="Register" />
                        </div>
                    </div>
                    </div>
            </Template>
        );
    }
}