/*
=====================================================
OMEGA19 Page
Login
=====================================================
*/

import React from 'react';
import Template from '../Template';

import Logo from '../../static/img/dark-logo.png';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isError: false,
            error: ""
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
        global.API.login(
            this.state.email,
            this.state.password
        )
        .then(
            (success) => {
                console.log(success);
                if(success.Result.code == "200") {
                    window.location = "/";
                } else {
                    this.setState({
                        isError: true,
                        error: "Incorrect e-mail address or password."
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
        if(this.state.isError) {
            return (
                <div className="large-12 cell">
                    <div className="message error">
                        {this.state.error}
                    </div>
                </div>
            );
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
                                    Log In
                                    </h3>
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
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={this.handleChange}
                                    />
                                </div>
                                {this.renderError()}
                                <div className="large-12 cell">
                                    <a onClick={this.handleSubmit}>
                                    <div id="loginBtn" className="button expanded cta-main button-login">
                                        Log In
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
                        <img src={Logo} alt="Log In" />
                        </div>
                    </div>
                    </div>
            </Template>
        );
    }
}