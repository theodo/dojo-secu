import React from 'react';
import { shallow } from 'enzyme';

import Level2 from './Level2';

/*
This file contains all unit tests. The standard is:
  - The name of the test is explicit.
  - The test file contains tests for each of the function use cases.
  - The test is testing one action only.
  - The test can fail.
*/
describe('[Component] <Level2 />', () => {
  it('should be a test with an explicit name', () => {
    const props = {
    };
    const wrapper = shallow(<Level2 {...props} />);
    expect(wrapper.exists()).toEqual(true);
  });
});
