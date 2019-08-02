/*
=====================================================
OMEGA19 Object
Hero (Google Maps)
=====================================================
*/

import React from 'react';

export default class HeroGoogleMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        classes: "hero"
    }
    if(this.props.short) {
        this.state.classes += " hero-midpage";
    }
  }
  shouldComponentUpdate() {
      return false;
  }
  componentDidMount() {
    let componentMap = new global.google.maps.Map(this.refs.herogooglemaps, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        disableDefaultUI: true
    });
  }
  render() {
    return (
      <div className="HeroGoogleMaps">
          <div id="hero-google-maps" ref="herogooglemaps" className={this.state.classes}></div>
      </div>
    );
  }
}