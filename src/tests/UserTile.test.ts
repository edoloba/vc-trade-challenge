import { shallowMount } from '@vue/test-utils';
import UserTile from '../components/UserTile.vue';

describe('UserTile', () => {
  it('emits the selected event when clicked', () => {
    const user = {
      login: { uuid: '1' },
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      picture: { thumbnail: 'thumbnail-url' },
    };

    const wrapper = shallowMount(UserTile, {
      props: {
        user,
      },
    });

    wrapper.trigger('click');

    expect(wrapper.emitted('selected')).toBeTruthy();
    expect(wrapper.emitted('selected')?.[0]).toEqual([user]);
  });

  it('displays the user information correctly', () => {
    const user = {
      login: { uuid: '1' },
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      picture: { thumbnail: 'thumbnail-url' },
    };

    const wrapper = shallowMount(UserTile, {
      props: {
        user,
      },
    });

    const imgElement = wrapper.find('img');
    const nameElement = wrapper.find('p.text-md');
    const emailElement = wrapper.find('p.text-sm');

    expect(imgElement.attributes('src')).toBe(user.picture.thumbnail);
    expect(imgElement.attributes('alt')).toBe(user.name.first + ' ' + user.name.last);
    expect(nameElement.text()).toBe(user.name.first + ' ' + user.name.last);
    expect(emailElement.text()).toBe(user.email);
  });
});