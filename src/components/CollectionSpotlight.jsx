/*
=====================================================
OMEGA19 Object
Collection Spotlight
=====================================================
*/

import React from 'react';

export default class CollectionSpotlight extends React.Component {
  constructor(props) {
    super(props);
  }
  didComponentMount() {
    
  }
  render() {
    return (
      <div className="CollectionSpotlight">
        <div className="section featured-collections">
          {this.props.children}
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}