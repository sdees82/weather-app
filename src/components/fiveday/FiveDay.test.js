import React from 'react'
import FiveDay from './FiveDay'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<FiveDay />);
});