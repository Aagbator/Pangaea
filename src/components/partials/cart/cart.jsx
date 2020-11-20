import React from 'react';
import AppContext from '../../../AppContext';
import sprite from '../../../assets/icomoon/sprite.svg';
import CartList from "./cart-list/cart-list";

const Cart = () => (
    <AppContext.Consumer>
        {context => (
            <>
                <div className={`cart ${context.isCartOpen ? 'isOpen' : '' }`}>
                    <header className="cart__header">
                        <span className="close-btn" role="button" onClick={() => context.toggleCart()} >
                            <svg className="icon icon-cross">
                                <use href={sprite + '#icon-cross'}></use>
                            </svg>
                        </span>
                        <h2 className="cart__title">Your cart ({context.cart.length})</h2>
                    </header>
                    <div className="cart__menu">
                        <select onChange={(event) => context.fetchProductByCurrency(event.target.value)}>
                            {context.currencies.map((currency, i) =>
                                <option key={i} value={currency}>{currency}</option>
                            )}
                        </select>
                    </div>
                    <div className="cart__body">
                        <CartList />
                    </div>
                    <div className="cart__footer">
                        <div className="cart__footer-summary">
                            <span>Subtotal</span>
                            <span>{context.currency} {context.subTotal}</span>
                        </div>
                        <div className="cart__footer-checkout">
                            <button className="checkout-btn">
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                </div>
                <div  className={`cart__overlay ${context.isCartOpen ? 'isVisible' : '' }`} onClick={() => context.toggleCart()}></div>
            </>
        )}
    </AppContext.Consumer>
);

 export default Cart;
