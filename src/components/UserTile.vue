<template>
  <li 
  @click="selectUser"
  class="p-2 m-4 flex border-2 border-slate-200 h-min lg:h-32"
  >
    <img
      :src="user.picture.thumbnail"
      :alt="user.name.first + ' ' + user.name.last"
      class="rounded-full"
    />
    <div class="flex flex-col pl-3 justify-center">
      <p class="text-md lg:text-xl">{{ user.name.first }} {{ user.name.last }}</p>
      <p class="text-sm lg:text-md">{{ user.email }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type User } from '../model/User'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  methods: {
    selectUser() {
      this.$emit('selected', this.user)
    }
  }
})
</script>
