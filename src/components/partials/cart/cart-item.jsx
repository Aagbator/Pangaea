import React from 'react';
import sprite from "../../../assets/icomoon/sprite.svg";
import PropTypes from "prop-types";

const CartItem = ({product, incrementProductQty, decreaseProductQty, currency, removeItem}) => {
    const {id, title, image_url, price, quantity} = product || {};
    return(
        <div className="cart__item">
            <div className="item__header">
                <h2>{title}</h2>
                <span className="remove-btn" role="button" onClick={() => removeItem(id)} >
                    <svg className="icon icon-cross">
                        <use href={sprite + '#icon-cross'}></use>
                    </svg>
                </span>
            </div>
            <div className="item__content">
                <div className="item__control">
                    <span onClick={() => decreaseProductQty(product)} className="item__control-block btn" role="button">-</span>
                    <span className="item__control-block text">{quantity}</span>
                    <span  onClick={() => incrementProductQty(product)} className="item__control-block btn" role="button">+</span>
                </div>
                <div className="item__price">
                    <span>{`${currency} ${price}`}</span>
                </div>
                <div className="item__thumbnail">
                    <img alt={title} src={image_url} />
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    product: PropTypes.object,
    currency: PropTypes.string,
    incrementProductQty: PropTypes.func,
    decreaseProductQty: PropTypes.func,
    removeItem: PropTypes.func,
};

export default CartItem;
