/*
=====================================================
OMEGA19 Object
Hero (Basic)
=====================================================
*/

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class HeroBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styling: {
        backgroundImage: 'url(' + this.props.image + ')'
      },
      classes: "hero"
    }
    if(this.props.short) {
      this.state.classes += " hero-midpage";
    }
  }
  didComponentMount() {
    
  }
  renderText() {
    if(this.props.flip == true) {
      return (
        <div>
          <h1>{this.props.heading}</h1>
          <h4>{this.props.subheading}</h4>
        </div>
      );
    } else {
      return (
        <div>
          <h4>{this.props.subheading}</h4>
          <h1>{this.props.heading}</h1>
        </div>
      );
    }
  }
  renderButton() {
    if(this.props.buttonText) {
      return (
        <Link to={this.props.buttonLink}>
          <div className="button">
            {this.props.buttonText}
          </div>
        </Link>
      );
    }
  }
  render() {
    return (
      <div className="HeroBasic">
        <div style={this.state.styling} className={this.state.classes}>
          <div className={this.props.unselectable ? "hero-basic-content unselectable" : "hero-basic-content"}>
            {this.renderText()}
            {this.renderButton()}
          </div>
        </div>
      </div>
    );
  }
}