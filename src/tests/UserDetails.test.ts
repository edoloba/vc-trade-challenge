import { shallowMount } from '@vue/test-utils';
import UserDetails from '@/components/UserDetails.vue';

describe('UserDetails', () => {
  it('displays user details correctly when user is provided', () => {
    const user = {
      login: { uuid: '1' },
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      picture: { thumbnail: 'thumbnail-url' },
      id: { value: '123456' },
      phone: '123456789',
      cell: '987654321',
      location: {
        street: { name: 'Street', number: '123' },
        postcode: '12345',
        city: 'City',
        state: 'State',
        country: 'Country',
      },
    };

    const wrapper = shallowMount(UserDetails, {
      props: {
        user,
      },
    });

    const imgElement = wrapper.find('img');
    const idElement = wrapper.findAll('td').at(0);
    const fullNameElement = wrapper.findAll('td').at(1);
    const emailElement = wrapper.findAll('td').at(2);
    const phoneElement = wrapper.findAll('td').at(3);
    const cellularElement = wrapper.findAll('td').at(4);
    const locationElement = wrapper.findAll('td').at(5);

    expect(imgElement.attributes('src')).toBe(user.picture.thumbnail);
    expect(imgElement.attributes('alt')).toBe(user.name.first + ' ' + user.name.last);
    expect(idElement?.text()).toBe(user.id.value);
    expect(fullNameElement?.text()).toBe(user.name.first + ' ' + user.name.last);
    expect(emailElement?.text()).toBe(user.email);
    expect(phoneElement?.text()).toBe(user.phone);
    expect(cellularElement?.text()).toBe(user.cell);
    expect(locationElement?.text()).toContain(
      `${user.location.street.name} ${user.location.street.number}, ${user.location.postcode} ${user.location.city}, ${user.location.state} (${user.location.country})`
    );
  });

  it('displays placeholder text when user is not provided', () => {
    const wrapper = shallowMount(UserDetails);

    const placeholderText = 'Click on User to get more information';
    const hiddenClass = 'hidden';

    expect(wrapper.text()).toBe(placeholderText);
    expect(wrapper.classes(hiddenClass)).toBe(true);
  });
});