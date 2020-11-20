import React from 'react';
import App from './App';
import { findByTestAttr} from './Utils'
import { shallow } from 'enzyme';

describe('App Component', () => {
  const wrapper = shallow(<App />);

  it('It should render without error', () => {
    const component = findByTestAttr(wrapper, 'appComponent');
    expect(component.length).toBe(1);
  })
})
