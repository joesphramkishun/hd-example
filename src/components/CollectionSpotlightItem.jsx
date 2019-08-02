/*
=====================================================
OMEGA19 Component
Collection Spotlight Item
=====================================================
*/

import React from 'react';

export default class CollectionSpotlightItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styling: {
        backgroundImage: 'url(' + this.props.image + ')'
      },
      size: "desktop-third mobile-whole"
    }
  }
  positionCheck() {
    if(this.props.center == true) {
      return (
        <div className="featured-collections-box featured-collections-box-center desktop-third mobile-whole" style={this.state.styling}>
          <h1>{this.props.title}</h1>
        </div>
      );
    } else {
      return (
        <div className="featured-collections-box desktop-third mobile-whole" style={this.state.styling}>
          <h1>{this.props.title}</h1>
        </div>
      );
    }
    
  }
  didComponentMount() {

  }
  render() {
    return (
      <div className="CollectionSpotlightItem">
        {this.positionCheck()}
      </div>
    );
  }
}