import { shallowMount, VueWrapper } from '@vue/test-utils'
import App from '../App.vue'

declare const window: any

describe('App', () => {
  let wrapper: VueWrapper<any>; 

  beforeEach(() => {
    wrapper = shallowMount(App, {
      data() {
        return {
          users: [],
          selectedUser: null,
          searchQuery: '',
          selectedGender: 'all'
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('fetches users on mount', async () => {
    const fetchUsersMock = jest.fn()
    shallowMount(App, {
      global: {
        mocks: {
          fetchUsers: fetchUsersMock
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(fetchUsersMock).toHaveBeenCalledTimes(1)
  })

  it('updates search query and selected gender on input change', async () => {
    const searchInput = wrapper.findComponent({ name: 'FilteredList' }).find('input')
    const genderSelect = wrapper.findComponent({ name: 'FilteredList' }).find('select')

    await searchInput.setValue('John')
    await genderSelect.setValue('male')

    expect(wrapper.vm.searchQuery).toBe('John')
    expect(wrapper.vm.selectedGender).toBe('male')
  })

  it('updates filteredUsers when search query or selected gender change', async () => {
    await wrapper.setData({ searchQuery: 'John' })
    expect(wrapper.vm.filteredUsers.length).toBe(1)
    expect(wrapper.vm.filteredUsers[0].name.first).toBe('John')

    await wrapper.setData({ searchQuery: '', selectedGender: 'female' })
    expect(wrapper.vm.filteredUsers.length).toBe(1)
    expect(wrapper.vm.filteredUsers[0].name.first).toBe('Jane')
  })

  it('displays user details when selected', async () => {
    const userItem = wrapper.findComponent({ name: 'UsersList' }).find('li:first-child')
    await userItem.trigger('click')

    expect(wrapper.vm.selectedUser).toEqual({ name: { first: 'John', last: 'Doe' }, gender: 'male' })
  })

  it('updates user list', async () => {
    const updatedUserList = [
      { name: { first: 'John', last: 'Doe' }, gender: 'male' },
      { name: { first: 'Jane', last: 'Smith' }, gender: 'female' }
    ]

    await wrapper.vm.updateUserList(updatedUserList)
    expect(wrapper.vm.users).toEqual(updatedUserList)
  })

  it('saves and retrieves selected user from sessionStorage', async () => {
    const getItemMock = jest.fn().mockReturnValueOnce(JSON.stringify({ name: { first: 'John', last: 'Doe' }, gender: 'male' }))
    const setItemMock = jest.fn()

    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: getItemMock,
        setItem: setItemMock
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedUser).toEqual({ name: { first: 'John', last: 'Doe' }, gender: 'male' })
    expect(getItemMock).toHaveBeenCalledWith('selectedUser')

    expect(setItemMock).toHaveBeenCalledTimes(1)
    expect(setItemMock).toHaveBeenCalledWith('selectedUser', JSON.stringify({ name: { first: 'John', last: 'Doe' }, gender: 'male' }))
  })

  it('cleans up sessionStorage on unmount', () => {
    const removeItemMock = jest.fn()

    Object.defineProperty(window, 'sessionStorage', {
      value: {
        removeItem: removeItemMock
      }
    })

    wrapper.unmount()

    expect(removeItemMock).toHaveBeenCalledTimes(4)
    expect(removeItemMock).toHaveBeenCalledWith('searchQuery')
    expect(removeItemMock).toHaveBeenCalledWith('selectedGender')
    expect(removeItemMock).toHaveBeenCalledWith('selectedUser')
    expect(removeItemMock).toHaveBeenCalledWith('users')
  })
})