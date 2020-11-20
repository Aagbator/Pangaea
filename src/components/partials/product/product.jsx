import React from 'react';
import PropTypes from 'prop-types';

const Product = ({product, currency, addToCart}) => {
    const {image_url, price, title} = product || {};
    if(!currency || !title){
        return null;
    }
    return(
        <div className="product" data-test="productComponent">
            <div className="product__img">
                <img
                    alt={title}
                    src={image_url} />
            </div>
            <div className="product__content">
                <p data-test="componentTitle" className="product__title">{title}</p>
                <p data-test="componentPrice" className="product__price">From {currency} {price}</p>
            </div>
            <div className="product__action m-">
                <button data-test="componentAddToCartButton" onClick={(e) => {addToCart(product)}} className="product__button">Add to Cart</button>
            </div>
        </div>
    )
}

Product.propTypes = {
    product: PropTypes.object,
    currency: PropTypes.string,
    addToCart: PropTypes.func,
};

export default Product;
