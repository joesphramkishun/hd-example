/*
=====================================================
OMEGA19 Component
Testimonials Item
=====================================================
*/

import React from 'react';

export default class TestimonialsItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="TestimonialsItem">
        <div className="testimonials-item-container desktop-third">
          <div className="testimonials-item">
            <div className="testimonials-item-left">
              <img src={this.props.image}/>
            </div>
            <div className="testimonials-item-right">
              <p>"{this.props.children}"</p>
              <p className="testimonials-item-author">- {this.props.author}</p>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}