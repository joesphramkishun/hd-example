/*
=====================================================
OMEGA19 Page
Search
=====================================================
*/

import React from 'react';
import Template from '../Template';
import SearchConstructor from '../SearchConstructor';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        var stringSanitizer = require("string-sanitizer");

        this.state = {
            query: this.props.match.params.searchURI ? this.props.match.params.searchURI : ""
        }
    }
    render() {
        return (
            <Template>
                <SearchConstructor query={this.state.query}/>
            </Template>
        );
    }
}