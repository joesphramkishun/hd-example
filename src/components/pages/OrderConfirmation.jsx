/*
=====================================================
OMEGA19 Page
Order Confirmation / Thank You
=====================================================
*/

import React from 'react';
import Template from '../Template';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Template>
                <div className="thank-you page">
                    <div className="thank-you-header">
                        <i class="fas fa-check-circle"></i>
                        <h1>Thank you for your order!</h1>
                        <p>Your order confirmation number is #902938472.</p>
                        <p>An e-mail with your reciept has been sent to example@company.com.</p>
                        <a href="/">
                            <div className="button button-login">
                                Go to Store
                            </div>
                        </a>
                    </div>
                </div>
            </Template>
        );
    }
}