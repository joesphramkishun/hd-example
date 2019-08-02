/*
=====================================================
OMEGA19 Page
Collections
=====================================================
*/

import React from 'react';
import Template from '../Template';

export default class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        categories: [],
        isLoaded: false
    }
    global.API.getCategories().then(
        (success) => {
            console.log(success);
            this.setState({
                categories: success.data,
                isLoaded: true
            });
        },
        (error) => {}
    );
  }

  renderLinks() {
    var components = [];
    if(this.state.isLoaded) {
        for(var category of this.state.categories) {
            components.push(
                <p>
                    <a href={"/collection/" + String(global.API.tools.toCategorySlug(category.name)).toLowerCase()}>
                        {category.name}
                    </a>
                </p>
            );
        }
    }
    return components;
  }

  render() {
      return (
          <Template>
              <div className="page">
                <h1>Collections</h1>
                {this.renderLinks()}
              </div>
          </Template>
      );
  }
  componentDidMount() {
    
  }
}