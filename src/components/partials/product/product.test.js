import React from 'react';
import { shallow } from 'enzyme';
import Product from './product';
import {checkProps, findByTestAttr} from "../../../utils";

    const expectedProps = {
        product: {
            id: 3,
            image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png",
            price: 29,
            title: "Premium-Grade Moisturizing Balm"
        },
        currency: 'USD',
        addToCart: () => {}
    }

describe('Product Component', () => {
    describe('Check Proptypes', () => {
        it('Should not throw a warning', () => {
            const propsError = checkProps(Product, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });

    describe('Component Renders', () => {
        let wrapper;
        let mockFunc;
        beforeEach(() => {
            mockFunc = jest.fn();
            const props = {
                ...expectedProps,
                addToCart: mockFunc
            }
            wrapper = shallow(<Product { ...props} />, '')
        });

        it('Should render without error', () => {
            const component = findByTestAttr(wrapper, 'productComponent');
            expect(component.length).toBe(1);
        });

        it('Should render a title', () => {
            const title = findByTestAttr(wrapper, 'componentTitle');
            expect(title.length).toBe(1);
        });

        it('Should render a price', () => {
            const price = findByTestAttr(wrapper, 'componentPrice');
            expect(price.length).toBe(1);
        });

        it('Should render a button', () => {
            const addToCartBtn = findByTestAttr(wrapper, 'componentAddToCartButton');
            expect(addToCartBtn.length).toBe(1);
        });
        it('Should emit callback on click event', () => {
            const button = findByTestAttr(wrapper, 'componentAddToCartButton');
            expect(button.length).toBe(1);
            button.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        })
    });

    describe('Should not render', () => {

        let wrapper;
        beforeEach(() => {
            const props = {}
            wrapper = shallow(<Product {...props} />);
        });

        it('Component is not rendered', () => {
            const component = findByTestAttr(wrapper, 'productComponent');
            expect(component.length).toBe(0);
        });
        it('Button is not rendered', () => {
            const component = findByTestAttr(wrapper, 'componentAddToCart');
            expect(component.length).toBe(0);
        });
    })
});
