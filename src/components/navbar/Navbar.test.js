import React from 'react'
import Navbar from './Navbar'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<Navbar />);
});