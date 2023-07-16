import { shallowMount } from '@vue/test-utils';
import UsersList from '../components/UsersList.vue';
import UserTile from '../components/UserTile.vue';
import { ref } from 'vue';

describe('UsersList', () => {
  it('renders UserTile components for each user in the list', () => {
    const users = [
      { login: { uuid: '1' }, name: { first: 'John', last: 'Doe' }, gender: 'male' },
      { login: { uuid: '2' }, name: { first: 'Jane', last: 'Smith' }, gender: 'female' },
    ];

    const wrapper = shallowMount(UsersList, {
      props: {
        users,
        selectedGender: '',
      },
    });

    const userTiles = wrapper.findAllComponents(UserTile);

    expect(userTiles.length).toBe(users.length);

    for (let i = 0; i < users.length; i++) {
      expect(userTiles[i].props('user')).toBe(users[i]);
    }
  });

  it('calls the selectUser event when a user is selected', () => {
    const users = [
      { login: { uuid: '1' }, name: { first: 'John', last: 'Doe' }, gender: 'male' },
      { login: { uuid: '2' }, name: { first: 'Jane', last: 'Smith' }, gender: 'female' },
    ];

    const wrapper = shallowMount(UsersList, {
      props: {
        users,
        selectedGender: '',
      },
    });

    const userTile = wrapper.findComponent(UserTile);
    userTile.vm.$emit('selected', users[0]);

    expect(wrapper.emitted('selected')).toBeTruthy();
    expect(wrapper.emitted('selected')?.[0]).toEqual([users[0]]);
  });

  it('loads more users when scrolling to the bottom', async () => {
    const users = [
      { login: { uuid: '1' }, name: { first: 'John', last: 'Doe' }, gender: 'male' },
      { login: { uuid: '2' }, name: { first: 'Jane', last: 'Smith' }, gender: 'female' },
    ];

    const isLoadingMore = ref(false); // Define isLoadingMore as a ref

    const wrapper = shallowMount(UsersList, {
      props: {
        users,
        selectedGender: '',
      },
      global: {
        provide: {
          isLoadingMore, // Provide the ref to the component
        },
      },
    });

    const container = wrapper.findComponent({ ref: 'container' });
    container.element.scrollHeight = 100;
    container.element.scrollTop = 0;
    container.element.clientHeight = 50;

    // Simulate scrolling to the bottom
    container.trigger('scroll');

    // Wait for the async loadMoreUsers function to complete
    await wrapper.vm.$nextTick();

    expect(isLoadingMore.value).toBe(true); // Access isLoadingMore from the ref
    expect(wrapper.emitted('updateUserList')).toBeTruthy();
    expect(wrapper.emitted('updateUserList')?.[0]).toEqual([users.concat(users)]);
    expect(isLoadingMore.value).toBe(false);
  });
});