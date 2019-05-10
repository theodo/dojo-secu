import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Profile from './Profile';

/*
Snapshot tests allow you to easily lock the comportment of a component.
Given props, it renders the component and compares it to the saved snapshot.
*/
describe('[Snapshot] <Profile />', () => {
  it('should render a button with a label', () => {
    const props = {
      intl: {
        formatMessage: jest.fn(),
      },
    };
    const wrapper = shallow(<Profile {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
