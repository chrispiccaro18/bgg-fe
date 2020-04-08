import React from 'react';
import { shallow } from 'enzyme';
import RandomGame from './RandomGame';

describe('RandomGame component', () => {
  it('renders RandomGame', () => {
    const wrapper = shallow(<RandomGame />);
    expect(wrapper).toMatchSnapshot();
  });
});
  