<template>
  <main>
    <header
      class="h-12 w-full lg:h-20 p-1 sticky border-b-2 broder-white-600 flex justify-center items-center"
    >
      <h1 class="text-2xl font-bold">VC-TRADE User Finder</h1>
    </header>
    <section class="w-full flex flex-col lg:flex-row">
      <aside flex="w-full flex flex-col">
        <div
          class="w-full flex flex-col justify-start h-24 lg:h-28 border-b-2 border-slate-200 pb-1 lg:pb-3"
        >
          <FilteredList
            :users="users"
            v-model="searchQuery"
            v-model:selectedGender="selectedGender"
          />
        </div>
        <div class="border-b-2 border-slate-200 lg:border-b-0">
          <UsersList
            :users="filteredUsers"
            :selectedGender="selectedGender"
            @selected="showUserDetails"
            @updateUserList="updateUserList"
          />
        </div>
      </aside>
      <article
        class="border-l-0 lg:border-l-2 border-white-600 w-full flex justify-center items-center"
      >
        <UserDetails :user="selectedUser" />
      </article>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { type User } from './model/User'
import axios from 'axios'
import UsersList from './components/UsersList.vue'
import FilteredList from './components/FilteredList.vue'
import UserDetails from './components/UserDetails.vue'

const resultsPerPage = 25
declare let sessionStorage: any

export default defineComponent({
  components: {
    UsersList,
    FilteredList,
    UserDetails
  },
  setup() {
    const users = ref<User[]>([])
    const selectedUser = ref<User | null>(null)
    const searchQuery = ref(sessionStorage.getItem('searchQuery') || '')
    const selectedGender = ref(sessionStorage.getItem('selectedGender') || 'all')

    const fetchUsers = async () => {
      try {
        const storedUsers = sessionStorage.getItem('users')
        if (storedUsers) {
          users.value = JSON.parse(storedUsers)
        } else {
          const response = await axios.get(`https://randomuser.me/api/?results=${resultsPerPage}`)
          users.value = response.data.results
          sessionStorage.setItem('users', JSON.stringify(users.value))
        }
      } catch (error) {
        console.log(error)
      }
    }

    // Filter users
    const filteredUsers = computed(() => {
      const query = searchQuery.value.trim().toLowerCase()
      const gender = selectedGender.value
      if (!query && gender === 'all') {
        return users.value
      }
      return users.value.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
        if (!query || fullName.includes(query)) {
          if (!gender || gender === 'all') {
            return true
          }
          return user.gender === gender
        }
        return false
      })
    })

    const showUserDetails = (user: User) => {
      selectedUser.value = { ...user }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('selectedUser', JSON.stringify(user))
      }
    }

    fetchUsers()

    const updateUserList = (newUserList: any) => {
      users.value = newUserList
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('users', JSON.stringify(users.value))
      }
    }

    // Save search query and selected gender to sessionStorage whenever they change
    watch([searchQuery, selectedGender], ([newSearchQuery, newSelectedGender]) => {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('searchQuery', newSearchQuery)
        sessionStorage.setItem('selectedGender', newSelectedGender)
      }
    })

    // Fetch users and retrieve previous state from sessionStorage on component mount
    onMounted(() => {
      fetchUsers()
      if (typeof sessionStorage !== 'undefined') {
        const storedSelectedUser = sessionStorage.getItem('selectedUser')
        if (storedSelectedUser) {
          selectedUser.value = JSON.parse(storedSelectedUser)
        }
      }
    })

    // Clean up sessionStorage on component unmount
    onBeforeUnmount(() => {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('searchQuery')
        sessionStorage.removeItem('selectedGender')
        sessionStorage.removeItem('selectedUser')
        sessionStorage.removeItem('users')
      }
    })

    return {
      users,
      selectedUser,
      searchQuery,
      selectedGender,
      filteredUsers,
      showUserDetails,
      updateUserList
    }
  }
})
</script>
