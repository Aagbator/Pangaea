import React from 'react';
import Product from "../components/partials/product/product";
import AppContext from "../AppContext";

const Home = () => {
    return (
        <AppContext.Consumer>
            {context => (
                <>
                    {
                        <section className="main-area">
                            <div className="product-grid">
                                {context.products.map((product, i) =>
                                    <Product key={i}
                                             product={product}
                                             currency={context.currency}
                                             addToCart={context.addToCart}
                                    />
                                )}
                            </div>
                        </section>
                    }
                </>
            )}
        </AppContext.Consumer>
    )
}

export default Home;
