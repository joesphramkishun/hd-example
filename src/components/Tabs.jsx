/*
=====================================================
OMEGA19 Object
Tabs
=====================================================
*/

import React from 'react';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPage: 0,
        pageContent: (
            <div>Loading...</div>
        )
    }
  }

  renderTabs() {
      let tabs = [];
      for(var i = 0; i < this.props.children.length; i++) {
          let classes = "tabs-item";
          if(this.state.currentPage == i) {
              classes += " tabs-item-selected";
          }
          const page = i;
          let a = (
              <div className={classes} onClick={() => this.handleClick(page)}>
                {this.props.children[i].props.title}
              </div>
          );
          tabs.push(a);
      }

      return tabs;
  }

  componentDidMount() {
      this.handleClick(0);
  }

  handleClick(page) {
    this.setState({
        currentPage: page,
        pageContent: this.props.children[page]
    });
  }
  
  render() {
    return (
        <div className={"tabs-section " + this.props.className}>
            <div className="tabs">
                {this.renderTabs()}
            </div>
            <div className="tabs-box">
                {this.state.pageContent}
            </div>
        </div>
    );
  }
}