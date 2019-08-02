/*
=====================================================
OMEGA19 Page
Cart
=====================================================
*/

import React from 'react';
import Template from '../Template';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currency: "",
            taxIncluded: false,
            subtotal: 0,
            total: 0,
            isLoaded: false,
            isEmpty: false
        }
        global.API.getCart().then(
            (success) => {
                console.log(success);
                try {
                    let data = success.Result.Response.data;
                    this.setState({
                        currency: data.currency.code,
                        taxIncluded: data.tax_included,
                        items: data.line_items.physical_items,
                        subtotal: parseFloat(data.base_amount).toFixed(2),
                        total: parseFloat(data.cart_amount).toFixed(2),
                        isLoaded: true
                    });
                } catch(e) {
                    this.setState({
                        isEmpty: true
                    });
                }
            },
            (error) => {}
        );
    }

    removeProduct(e) {
        let pid = e.target.id;
        global.API.removeFromCart(pid).then(
            (success) => {
                console.log(success);
                window.location = "/cart";
            },
            (error) => {
                console.log("error");
                console.log(error);
            }
        );
    }

    renderProducts(mobile = false) {
        let items = [];
        if(this.state.isLoaded) {
            if(mobile == false) {
                for(var i = 0; i < this.state.items.length; i++) {
                    let product = this.state.items[i];
                    items.push(
                        <tr>
                            <td className="cart-table-image">
                                <img src={product.image_url}/>
                            </td>
                            <td className="cart-table-title"><a href={"/product/" + global.API.tools.toSlug(product.product_id, product.name)}>{product.name}</a></td>
                            <td className="cart-table-quantity">
                                <p>{product.quantity}</p>
                                <a id={product.product_id} onClick={this.removeProduct}>Remove</a>
                            </td>
                            <td className="cart-table-price">${parseFloat(product.sale_price).toFixed(2)}</td>
                        </tr>
                    );
                }
            } else {
                for(var i = 0; i < this.state.items.length; i++) {
                    let product = this.state.items[i];
                    items.push(
                        <div className="cart-mobile-items">
                            <div className="mobile-fifth">
                                <a href={"/product/" + global.API.tools.toSlug(product.product_id, product.name)}>
                                    <img src={product.image_url}/>
                                </a>
                            </div>
                            <div className="cart-mobile-items__info">
                                <a href={"/product/" + global.API.tools.toSlug(product.product_id, product.name)}>
                                    <div className="cart-mobile-items__name">{product.name}</div>
                                </a>
                                <div className="cart-mobile-items__quantity">Quantity: {product.quantity}</div>
                                <div className="cart-mobile-items__price">${parseFloat(product.sale_price).toFixed(2)}</div>
                                <br/>
                                <div className="mobile-whole" style={{margin: "20px 0px 0px 0px"}}>
                                    <a id={product.product_id} onClick={this.removeProduct}>Remove</a>
                                </div>

                            </div>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div style={{textAlign: "center", margin: "20px 0px"}}>
                    <p>{this.state.isEmpty ? "Your cart is empty." : "Loading..."}</p>
                </div>
            );
        }
        return items;
    }

    render() {
        return (
            <Template>
                <div className="cart page">
                    <div className="cart-desktop">
                        <h1>Cart</h1>
                        <table className="cart-table">
                            <thead>
                                <td></td>
                                <td>Item</td>
                                <td>Quantity</td>
                                <td>Price</td>
                            </thead>
                            {this.renderProducts()}
                        </table>
                        <div className="desktop-quarter right text-align-right">
                            <p>Subtotal: ${this.state.subtotal}</p>
                            <p>Grand Total: ${this.state.total}</p>
                            <a href="/checkout"><div className="button button-contrast">Checkout</div></a>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="cart-mobile">
                        <h1>Cart</h1>
                        {this.renderProducts(true)}
                        <div className="cart-mobile-pricing mobile-whole">
                            <p>Subtotal: ${this.state.subtotal}</p>
                            <p>Grand Total: ${this.state.total}</p>
                            <a href="/checkout"><div className="button button-contrast">Checkout</div></a>
                        </div>
                    </div>
                </div>
            </Template>
        );
    }
}