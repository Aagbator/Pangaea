import React from 'react';
import Header from './modules/Header';
import ThemeSwitcher from '../elements/theme-switcher';
import Cart from "../partials/cart/cart";

const DefaultLayout = ({ children }) => (

    <div className="layout">
        <Header />
        {children}
        <ThemeSwitcher/>
        <Cart/>
    </div>
);

export default DefaultLayout;
