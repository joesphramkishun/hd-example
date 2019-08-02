/*
=====================================================
OMEGA19 Object
Instagram Feed
=====================================================
*/

import React from 'react';
import ReactDOM from 'react-dom';

export default class InstagramFeed extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return <div id="instafeed"/>;
  }
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'awesome',
        clientId: 'YOUR_CLIENT_ID'
    });
    feed.run();
  }
}