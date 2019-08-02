import React from 'react';
import ReactDOM from 'react-dom';
import TOC from './TOC';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './api';


ReactDOM.render(
    <BrowserRouter>
        <TOC />
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
