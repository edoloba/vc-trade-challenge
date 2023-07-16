<template>
  <div class="flex justify-center items-center">
    <div v-if="user" class="flex flex-col gap-10 justify-center items-center my-5">
      <img
        :src="user.picture.thumbnail"
        :alt="user.name.first + ' ' + user.name.last"
        class="rounded-full w-64"
      />
      <table class="table-fixed w-[20rem] lg:w-[50rem] mx-5">
        <tbody>
          <tr class="flex flex-col lg:table-row">
            <th class="border text-center lg:text-left p-4 w-full lg:w-32">ID</th>
            <td class="border text-center lg:text-left p-4">{{ user.id.value }}</td>
          </tr>
          <tr class="flex flex-col lg:table-row">
            <th class="border text-center lg:text-left p-4 w-full lg:w-32">Full Name</th>
            <td class="border text-center lg:text-left p-4">
              {{ user.name.first }} {{ user.name.last }}
            </td>
          </tr>
          <tr class="flex flex-col lg:table-row">
            <th class="border text-center lg:text-left p-4 w-full lg:w-32">Email</th>
            <td class="border text-center lg:text-left p-4">{{ user.email }}</td>
          </tr>
          <tr class="flex flex-col lg:table-row">
            <th class="border text-center lg:text-left p-4 w-full lg:w-32">Phone</th>
            <td class="border text-center lg:text-left p-4">{{ user.phone }}</td>
          </tr>
          <tr class="flex flex-col lg:table-row">
            <th class="border text-center lg:text-left p-4 w-full lg:w-32">Cellular</th>
            <td class="border text-center lg:text-left p-4">{{ user.cell }}</td>
          </tr>
          <tr class="flex flex-col lg:table-row">
            <th class="border text-center lg:text-left p-4 w-full lg:w-32">Location</th>
            <td class="border text-center lg:text-left p-4">
              {{ user.location.street.name }} {{ user.location.street.number }},
              {{ user.location.postcode }} {{ user.location.city }}, {{ user.location.state }} ({{
                user.location.country
              }})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else :class="{ hidden: user }" class="flex justify-center items-center">
      Click on User to get more information
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type User } from '../model/User'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User | null>,
      default: null
    }
  }
})
</script>
