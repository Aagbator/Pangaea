import React, { Component } from 'react';
import AppContext from './AppContext';
import { gql } from '@apollo/client';
import client from "./ApolloClient";

export default class AppProvider extends Component {
    state = {
        isCartOpen: false,
        currentTheme: 'light',
        products: [],
        cart: [],
        subTotal: 0,
        currencies:[],
        themes: {
            light: {
                'menu-bg': 'rgba(55, 95, 255, 0.144)',
                'main-area-color': '#fcfcfa',
                'header-bg': '#ffffff',
                'text-color': '#444444',
                'text-color-2': '#aaaaaa',
            },
            dark: {
                'menu-bg': 'rgba(255, 255, 255, 0.9)',
                'main-area-color': '#333333',
                'header-bg': '#111111',
                'text-color': '#c1c1c1',
                'text-color-2': '#aaaaaa'
            }
        },
        currency: 'USD'
    };

    fetchProducts(currency){
        this.setState({currency})
        client.query({
            query: gql`
            query {
              products {
                id,
                title,
                image_url,
                price( currency: ${currency} ),
              }
            }
          `
        }).then(response => {
            this.setState({products: response.data.products});
            this.updateCartOnCurrencyUpdate();
        });
    }

    getCurrencies(){
        client.query({
            query: gql`
            query {
              currency
            }
          `
        }).then(response => this.setState({currencies: response.data.currency}));
    }

    getSubTotal(){
        return this.state.cart.reduce((subtotal, product) => {
            return subtotal + (product.price * product.quantity);
        }, 0)
    }

    toggleCart(){
        this.setState({isCartOpen: !this.state.isCartOpen});
        return false;
    }

    updateCartOnCurrencyUpdate(){
        if(this.state.cart.length > 0){
              const newCart = this.state.cart.map(prod => {
                const product = this.getProductById(prod.id);
                if(product){
                    return {...prod, price : product.price}
                } else {
                    return product;
                }
            });
            this.setState({...this.state, cart: newCart});
        }
    }

    getProductById(productId){
        let products = [].concat(this.state.products);
        const product = products.filter(p => p.id === productId)[0];
        return product
    }

    addToCart(product){
        if(!product){
            return false;
        }
        let existProduct = this.state.cart.find(prod => prod.id === product.id);
        if(existProduct){
            this.incrementProductQty(product);
        } else {
            this.addProduct(product);
        }
        this.toggleCart();
    }

    addProduct(product){
        const newProduct = {...product, quantity : 1};
        const newCart = [].concat(this.state.cart);
        newCart.push(newProduct);
        this.setState({...this.state, cart: newCart});
    }

    incrementProductQty(product){
        let newCart = [];
        if(!product){
            return false;
        }

        let selectedProduct = this.state.cart.find(prod => prod.id === product.id);
        if(selectedProduct){
            selectedProduct.quantity++;
            newCart = this.state.cart.map(prod => {
                if(prod.id === product.id){
                    return {...prod, quantity : prod.quantity++}
                }
                return prod;
            });
        }
        this.setState({...this.state, cart: newCart});
    }

    decreaseProductQty(product){
        let newCart = [];
        if(!product){
            return false;
        }
        let selectedProduct = this.state.cart.find(prod => prod.id === product.id);
        if(selectedProduct){
            if(selectedProduct.quantity > 1){
                selectedProduct.quantity--;
                newCart = this.state.cart.map(prod => {
                    if(prod.id === product.id){
                        return {...prod, quantity : prod.quantity++}
                    }
                    return prod;
                });
                this.setState({...this.state, cart: newCart});
            } else {
                this.removeItem(product.id);
            }
        }
    }

    removeItem(productId){
        const filteredCart = this.state.cart.filter(product => product.id !== productId);
        console.log(filteredCart);
        this.setState({...this.state, cart : filteredCart});
    }

    componentDidMount(){
        this.switchTheme();
        this.fetchProducts(this.state.currency);
        this.getCurrencies();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentTheme !== prevState.currentTheme){
            this.switchTheme();
        }
    }

    switchTheme = () => {
        const theme = this.state.themes[this.state.currentTheme];
        Object.keys(theme).forEach((key) => {
            document.body.style.setProperty(`--${key}`, `${theme[key]}`)
        })
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    isCartOpen: this.state.isCartOpen,
                    currentTheme: this.state.currentTheme,
                    products: this.state.products,
                    currencies: this.state.currencies,
                    currency: this.state.currency,
                    cart: this.state.cart,
                    subTotal: this.getSubTotal(),
                    removeItem:(id) => this.removeItem(id),
                    addToCart:(product) => this.addToCart(product),
                    incrementProductQty:(product) => this.incrementProductQty(product),
                    decreaseProductQty:(product) => this.decreaseProductQty(product),
                    fetchProductByCurrency:(currency) => this.fetchProducts(currency),
                    toggleCart: () => {this.toggleCart()},
                    toggleTheme: () => {
                        if(this.state.currentTheme === 'light'){
                            this.setState({
                                ...this.state,
                                currentTheme: 'dark'
                            }, this.switchTheme());
                        } else {
                            this.setState({
                                ...this.state,
                                currentTheme: 'light'
                            }, this.switchTheme());
                        }
                    }
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
