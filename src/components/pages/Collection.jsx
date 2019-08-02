/*
=====================================================
OMEGA19 Page
Collection
=====================================================
*/

import React from 'react';
import Template from '../Template';
import CollectionConstructor from '../CollectionConstructor';

export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: null,
            isAllProducts: false,
            isLoaded: false
        };
    }
    componentDidMount() {
        var stringSanitizer = require("string-sanitizer");

        const { collectionURI } = this.props.match.params;
        console.log(collectionURI);
        
        if(collectionURI == "all") {
            this.setState({
                isAllProducts: true,
                isLoaded: true
            });
        } else {
            var collectionsCondensed = [];
            global.API.getCategories().then(
                (success) => {
                    console.log(success);
                    for(var category of success.data) {
                        collectionsCondensed.push({
                            id: category.id,
                            title: category.page_title.length > 0 ? category.page_title : category.name,
                            slug: stringSanitizer.sanitize.addDash(String(category.name).toLowerCase()),                        
                        });
                    }
                    this.setState({
                        collections: collectionsCondensed,
                        isLoaded: true
                    });
                },
                (error) => {}
            );
        }
        
    }
    renderCollectionConstructor() {
        if(this.state.isLoaded) {
            if(this.state.isAllProducts) {
                return (
                    <div>
                        <CollectionConstructor id={"all"}/>
                    </div>
                );
            } else {
                var uri = String(this.props.match.params.collectionURI).toLowerCase();
                var found = this.state.collections.find(function(a) {
                    return a.slug.includes(uri);
                });
                if(found) {
                    return (
                        <div>
                            <CollectionConstructor title={found.title} id={found.id}/>
                        </div>
                    );
                }
            }
        }
    }
    render() {
        return (
            <Template>
                {this.renderCollectionConstructor()}
            </Template>
        );
    }
}