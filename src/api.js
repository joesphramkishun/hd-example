// document.cookie = "cookie=Ihk0AQz6aA";

var ls = {};

ls.gk = (item) => { localStorage.getItem(item) }
ls.sk = (item, value) => { localStorage.setItem(item, value) }
ls.gkJSON = (item) => {
    try {
        return JSON.parse(localStorage.getItem(item));
    } catch(e) {
        return null;
    }
}

global.API_ENDPOINT = "http://localhost:4040";
global.API = {};
global.API.cacheLoaded = false;
global.API.cache = {};
global.API.tools = {};

// if(ls.gk("cachedProducts")) {
//     const products = ls.gkJSON("cachedProducts");
//     global.API.cache.products = JSON.parse(products);
//     global.API.cacheLoaded = true;
// }

global.API.tools.toSlug = (id, title) => {
    var stringSanitizer = require("string-sanitizer");
    return String(stringSanitizer.sanitize.addDash(id + " " + title)).toLowerCase();
}

global.API.tools.toCategorySlug = (text) => {
    var stringSanitizer = require("string-sanitizer");
    return String(stringSanitizer.sanitize.addDash(text)).toLowerCase();    
}

global.API.getProducts = (id, category) => {
    return new Promise(function(resolve, reject) {
        var endpointProducts = "";
        if(id) {
            endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products?id=" + parseInt(id);
        } else if(category) {
            endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products?categories=" + parseInt(category);
        } else {
            endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products";
        }
        fetch(endpointProducts)
        .then(res => res.json())
        .then(
        (success) => {
            resolve(success);
        },
        (error) => {
            reject(error);
        });
    });
};

global.API.searchProducts = (query) => {
    return new Promise(function(resolve, reject) {
        var endpointProducts = "/shop/bigcommerce/products?search=";
        endpointProducts += encodeURIComponent(query);
        fetch(endpointProducts)
        .then(res => res.json())
        .then(
        (success) => {
            resolve(success);
        },
        (error) => {
            reject(error);
        });
    });
}

global.API.getSimpleProducts = () => {
    var stringSanitizer = require("string-sanitizer");
    return new Promise(function(resolve, reject) {
        var endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products";
        var dict_array = [];
        fetch(endpointProducts)
        .then(res => res.json())
        .then(
        (success) => {
            for(var i = 0; i < success.data.data.length; i++) {
                let item = {
                    title: success.data.data[i].name,
                    price: success.data.data[i].price,
                    image: success.data.data[i].images.length > 0 ? success.data.data[i].images[0].url_thumbnail : "",
                    slug: stringSanitizer.sanitize.addDash(success.data.data[i].id + " " + success.data.data[i].name),
                }
                dict_array.push(item);
            }
            resolve(dict_array);
        },
        (error) => {
            reject(error);
        });
    });
}

global.API.getCart = () => {
    return new Promise(function(resolve, reject) {
        var endpointCart = global.API_ENDPOINT + "/shop/bigcommerce/cart";
        fetch(endpointCart)
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.addToCart = (id, quantity, options=null) => {
    return new Promise(function(resolve, reject) {
        var endpointCart = global.API_ENDPOINT + "/shop/bigcommerce/cart?pid=" + id + (quantity ? "&quantity=" + quantity : "");
        var optionsString = "";
        if(options) {
            for(var option of options) {
                optionsString += option.id + ":" + option.currentValue + ",";
            }
            optionsString = optionsString.substring(0, optionsString.length-1);
            endpointCart += "&options=" + encodeURIComponent(optionsString);
        }
        fetch(endpointCart, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.removeFromCart = (id) => {
    return new Promise(function(resolve, reject) {
        var endpointCart = global.API_ENDPOINT + "/shop/bigcommerce/cart?pid=" + id;
        fetch(endpointCart, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.updateCart = (id, quantity) => {
    return new Promise(function(resolve, reject) {
        var endpointUpdateCart = global.API_ENDPOINT + "/shop/bigcommerce/cart";
        var content = {
            pid: parseInt(id),
            quantity: parseInt(quantity)
        }
        fetch(endpointUpdateCart, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                console.log(success);
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.login = (email, password) => {
    return new Promise(function(resolve, reject) {
        var endpointLogin = global.API_ENDPOINT + "/user/login";
        let content = {
            "email": email,
            "password": password
        }
        console.log(content);
        fetch(endpointLogin, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.logout = () => {
    return new Promise(function(resolve, reject) {
        var endpointLogout = global.API_ENDPOINT + "/user/logout";
        fetch(endpointLogout)
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.register = (fname, lname, email, phone, password) => {
    return new Promise(function(resolve, reject) {
        var endpointRegister = global.API_ENDPOINT + "/user/register";
        let content = {
            "first_name": fname,
            "last_name": lname,
            "email": email,
            "phone": phone,
            "password": password
        }
        fetch(endpointRegister, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.forgotPassword = (email) => {
    return new Promise(function(resolve, reject) {
        var endpointForgotPassword = global.API_ENDPOINT + "/user/forgot_password";
        let content = {
            "email": email
        }
        fetch(endpointForgotPassword, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.dashboard = () => {
    return new Promise(function(resolve, reject) {
        var endpointDashboard = global.API_ENDPOINT + "/user/dashboard";
        fetch(endpointDashboard, {
            headers: {
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'GET',
                'Access-Control-Allow-Headers':'application/json'
            },
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.checkout = (content_dict) => {
    return new Promise(function(resolve, reject) {
        var endpointCheckout = global.API_ENDPOINT + "/shop/bigcommerce/cart/order";
        fetch(endpointCheckout, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content_dict)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.getCategories = () => {
    return new Promise(function(resolve, reject) {
        var endpointCategories = global.API_ENDPOINT + "/shop/bigcommerce/products/categories";
        fetch(endpointCategories)
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.postForgotPassword = (email) => {
    return new Promise(function(resolve, reject) {
        var endpointForgotPassword = global.API_ENDPOINT + "/user/forgot_password";
        var content = {
            email: email
        }
        fetch(endpointForgotPassword, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}