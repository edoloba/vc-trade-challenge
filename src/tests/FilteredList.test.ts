import { shallowMount } from '@vue/test-utils';
import FilteredList from '../components/FilteredList.vue';

describe('FilteredList', () => {
  it('emits search query and selected gender on input change', async () => {
    const users = [
      { name: { first: 'John', last: 'Doe' }, gender: 'male' },
      { name: { first: 'Jane', last: 'Smith' }, gender: 'female' },
    ];

    const wrapper = shallowMount(FilteredList, {
      props: {
        users,
        modelValue: '',
        selectedGender: 'all',
      },
    });

    const searchInput = wrapper.find('input');
    const genderSelect = wrapper.find('select');

    await searchInput.setValue('John');
    await genderSelect.setValue('male');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['John']);
    expect(wrapper.emitted('update:selectedGender')?.[0]).toEqual(['male']);
  });

  it('correctly filters the list based on search query and selected gender', async () => {
    const users = [
      { name: { first: 'John', last: 'Doe' }, gender: 'male' },
      { name: { first: 'Jane', last: 'Smith' }, gender: 'female' },
      { name: { first: 'Adam', last: 'Johnson' }, gender: 'male' },
    ];

    const wrapper = shallowMount(FilteredList, {
      props: {
        users,
        modelValue: '',
        selectedGender: 'all',
      },
    });

    const searchInput = wrapper.find('input');
    const genderSelect = wrapper.find('select');

    // Set search query to 'Jo' and selected gender to 'male'
    await searchInput.setValue('Jo');
    await genderSelect.setValue('male');

    expect((wrapper.vm as any).filteredUsers).toEqual([
      { name: { first: 'John', last: 'Doe' }, gender: 'male' },
      { name: { first: 'Adam', last: 'Johnson' }, gender: 'male' },
    ]);
  });
});