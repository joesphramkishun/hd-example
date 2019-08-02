/*
=====================================================
OMEGA19 Page
Logout
=====================================================
*/

import React from 'react';
import Template from '../Template';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        global.API.logout().then(
            (success) => {
                window.location = "/";
            },
            (error) => {}
        );
    }

    render() {
        return (
            <div className="">Logging out...</div>
        );
    }
}