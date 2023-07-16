<template> 
  <div class="m-4 flex flex-col gap-3 h-32">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by name and/or surname"
      class="p-1 lg:p-2 w-full lg:w-[30rem] border rounded placeholder-slate-[#393535] bg-transparent border-b-1px focus:border-slate-[#393535] focus:shadow-[0px_1px_0_0_#393535]"
    />
    <select
      v-model="selectedGenderValue"
      name="gender"
      id="gender"
      class="w-32 border p-1 text-sm rounded-lg bg-transparent focus:outline-none focus:ring focus:border-[#020127] border-[#f5f8ff] max-h-40 overflow-auto"
    >
      <option selected class="" value="all">All</option>
      <option class="" value="female">Female</option>
      <option class="" value="male">Male</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, type PropType } from 'vue'
import { type User } from '../model/User'

export default defineComponent({
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    selectedGender: {
      type: String,
      default: 'all'
    }
  },
  emits: ['update:modelValue', 'update:selectedGender'],
  setup(props, { emit }) {
    const searchQuery = ref(props.modelValue)
    // Gender selection
    const selectedGenderValue = computed({
      get: () => props.selectedGender,
      set: (value) => emit('update:selectedGender', value)
    })

    // Filter the list based on search query and gender selection
    const filteredUsers = computed(() => {
      const query = searchQuery.value.trim().toLowerCase()
      const gender = selectedGenderValue.value

      // Apply filter
      return props.users.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
        if (!query && gender === 'all') {
          return true // No search query or gender selected, return all users
        }
        if (query && !fullName.includes(query)) {
          return false // Search query does not match user's name
        }
        if (gender && gender !== 'all' && user.gender !== gender) {
          return false // Gender does not match user's gender
        }
        return true // User matches the search query and gender
      })
    })

    // Emit changes to the parent component
    watch(
      () => searchQuery.value,
      (newValue) => {
        emit('update:modelValue', newValue)
      }
    )

    return {
      searchQuery,
      selectedGenderValue,
      filteredUsers
    }
  }
})
</script>
