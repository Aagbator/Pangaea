import React from 'react';
import CartItem from "../cart-item";
import AppContext from "../../../../AppContext";

const CartList = () => (
    <AppContext.Consumer>
        {context => (
            <>
                {
                    <div className="cart-list">
                        {context.cart.map((product, i) =>
                            <CartItem
                                key={i}
                                currency={context.currency}
                                removeItem={context.removeItem}
                                incrementProductQty={context.incrementProductQty}
                                decreaseProductQty={context.decreaseProductQty}
                                product={product}/>
                        )}
                    </div>
                }
            </>
        )}
    </AppContext.Consumer>
)

 export default CartList;
