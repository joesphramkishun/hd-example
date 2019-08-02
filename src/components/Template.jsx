/*
=====================================================
OMEGA19 v0.1
Basic Theme Template for RogueShops

Raphael Restrepo
=====================================================
*/

/* COMPONENTS */
import React from 'react';
import Navigation from './Navigation';
import NavigationItem from './NavigationItem';
import Footer from './Footer';
import Footnote from './Footnote';

/* STATIC RESOURCES */
import '../static/css/all.css';
import '../static/css/foundation.css';
import '../static/css/main.scss';
import Logo from '../static/img/headdown.png';

class Template extends React.Component {
  constructor(props) {
    super(props);
  }
  didComponentMount() {
    
  }
  render() {
    return (
      <div className="Application">
        <Navigation solid={!this.props.index}>
          <NavigationItem title="Shop" link="/collection/all" />
          <NavigationItem title="About" link="/about" />
          <NavigationItem title="Contact" link="/contact" />
          <NavigationItem title="FAQ" link="/faq" />
          <NavigationItem title="Warranty" link="/warranty" />
          <NavigationItem title="Privacy" link="/privacy" />
          <NavigationItem title="Shipping and Returns" link="/shipping-returns"/>
          <NavigationItem title="Cerakote" link="/cerakote" />
        </Navigation>

        {this.props.children}

        <Footer image={Logo}/>
        <Footnote content="©2019 Head Down Firearms. All rights reserved."/>
      </div>
    );
  }
}

export default Template;
