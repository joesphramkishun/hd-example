/*
=====================================================
OMEGA19 Page
Product
=====================================================
*/

import React from 'react';
import Template from '../Template';
import Tabs from '../Tabs';
import TabsPage from '../TabsPage';

import NoImage from '../../static/img/no-image.png';
import FeaturedProducts from '../FeaturedProducts';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.productURI.split("-")[0]),
            name: "",
            price: 0,
            description: "",
            isLoaded: false,
            quantity: 1,
            featuredImage: "",
            images: null,
            currentImage: 0,
            animAddedToCartClasses: "",
            data: {},
            options: [
                {
                    id: "1",
                    name: "test",
                    label: "Test",
                    currentValue: 0,
                    values: [
                        {
                            id: "3",
                            label: "Right"
                        }
                    ]
                }
            ]
        };
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    renderOptions() {
        let renderable = [];
        if(this.state.isLoaded) {
            if(this.state.options.length > 0) {
                for(var option of this.state.options) {
                    let items = [];
                    for(var value of option.values) {
                        items.push(
                            <option value={value.id}>{value.label}</option>
                        );
                    }
                    console.log(renderable.length);
                    renderable.push(
                        <div className="product-page-option">
                            <label>{option.label}</label>
                            <select id={renderable.length} onChange={this.handleOptionChange}>
                                {items}
                            </select>
                        </div>
                    );
                }
            }
        }
        return renderable;
    }

    handleOptionChange(e) {
        var optionID = e.target.id;
        var optionValue = e.target.value;
        var options = this.state.options;

        console.log(optionID + " " + optionValue);

        options[optionID].currentValue = optionValue;
    }

    handleAddToCart() {

        global.API.addToCart(this.state.id, this.state.quantity, (this.state.options.length > 0 ? this.state.options : null )).then(
            (success) => {
                this.setState({
                    animAddedToCartClasses: "added-to-cart-trigger"
                });
            },
            (error) => {
                console.log("api error");
            }
        );
        
    }

    handleQuantityChange(event) {
        let value = parseInt(event.target.value);
        this.setState({
            quantity: value < 1 ? 1 : value > 20 ? 20 : value
        });
    }

    componentDidMount() {
        global.API.getProducts(this.state.id).then(
            (success) => {
                console.log(success);
                let options = success.data.options;
                let optionsCondensed = [];
                if(options.length > 0) {
                    for(var i = 0; i < options.length; i++) {
                        let option = options[i];
                        let hasSetFirst = false;
                        let item = {
                            id: option.id,
                            label: option.display_name,
                            currentValue: 0,
                            values: []
                        }
                        for (var value of option.option_values) {
                            if(!hasSetFirst) {
                                item.currentValue = value.id;
                                hasSetFirst = true;
                            }
                            let itemPush = {
                                id: value.id,
                                label: value.label
                            }
                            item.values.push(itemPush);
                        }
                        optionsCondensed.push(item);
                    }
                }
                this.setState({
                    data: success.data,
                    name: success.data.name,
                    price: success.data.price,
                    featuredImage: (success.data.images.length > 0 ? success.data.images[0].url_zoom : NoImage),
                    images: (success.data.images.length > 0 ? success.data.images : null),
                    options: optionsCondensed.length > 0 ? optionsCondensed : [],
                    description: success.data.description,
                    isLoaded: true
                });
            },
            (error) => {}
        );
    }

    returnDescriptionHTML() {
        return {
            __html: this.state.description
        }
    }

    renderTabs() {
        if(this.state.isLoaded) {
            return (
                <Tabs className="desktop-whole mobile-whole right">
                    <TabsPage title="Description">
                        <div dangerouslySetInnerHTML={this.returnDescriptionHTML()}></div>
                    </TabsPage>
                    <TabsPage title="Specifications">
                        <h1>Insert Specifications Here</h1>
                        <p>RogueShops is currently in alpha. We will be adding this soon.</p>
                    </TabsPage>
                    <TabsPage title="Reviews">
                        <h1>Coming Soon!</h1>
                        <p>RogueShops is currently in alpha. We will be adding this soon.</p>
                    </TabsPage>
                </Tabs>
            );
        }
    }

    renderThumbnails() {
        let thumbnails = [];
        if(this.state.isLoaded) {
            for(var i = 0; i < this.state.images.length; i++) {
                const image = this.state.images[i]
                thumbnails.push(
                    <div id={i} onClick={this.handleThumbnailClick} className="product-page-thumbnail" style={{backgroundImage: "url(" + image.url_standard + ")"}}></div>
                );
            }
        }
        return thumbnails;
    }

    handleThumbnailClick(e) {
        let id = e.target.id;
        this.setState({
            featuredImage: this.state.images[id].url_zoom
        });
    }
    setImageSource() {
        if(this.state.isLoaded) {
            this.setState((state, props) => ({
                featuredImage: state.images[state.currentImage].url_zoom
            }));
        }
    }
    render() {
        return (
            <Template>
                <div className="Product page product-page">
                    <div className="product-page-breadcrumb">
                        <p>Collection > {this.state.name}</p>
                    </div>
                    <div className="desktop-half mobile-whole left product-page-head-half product-page-head-image">
                        <img className="full-width" src={this.state.featuredImage}/>
                        {this.renderThumbnails()}
                    </div>
                    <div className="desktop-half mobile-whole right product-page-head-half">
                        <h1>{this.state.name}</h1>
                        <p className="product-page-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </p>
                        
                        <h6>{"$" + parseFloat(this.state.price).toFixed(2)}</h6>
                        {this.renderOptions()}
                        <label htmlFor="Quantity">Quantity</label>
                        <input id="Quantity" type="number" min={1} max={100} value={this.state.quantity} onChange={this.handleQuantityChange}/>

                        <div id="AddToCart" className="button" onClick={() => this.handleAddToCart()}>Add to Cart</div>
                        <div className={"added-to-cart " + this.state.animAddedToCartClasses}><i className="fas fa-check"></i></div>
                        {this.renderTabs()}
                    </div>

                    <div className="clearfix"></div>

                    
                    <div className="clearfix"></div>

                    <FeaturedProducts title="Check out our other products!" collectionID="all"/>
                </div>
            </Template>
        );
    }
}