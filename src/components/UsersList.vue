<template>
  <div>
    <ul class="overflow-y-auto h-[20rem] md:h-[calc(100vh-190px)]" @scroll="handleScroll" ref="container">
        <UserTile v-for="user in displayedUsers" :key="user.login.uuid" :user="user" @selected="selectUser(user)"/>
        <li v-if="isLoadingMore && displayedUsers.length" class="p-2 m-4 flex border-2 border-slate-200 h-min md:h-32 text-center">Loading more</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, watch, provide } from "vue";
import { type User } from "../model/User";
import UserTile from "./UserTile.vue";
import axios from "axios";

const resultsPerPage = 25;

export default defineComponent({
  components: { UserTile },
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
    selectedGender: {
        type: String,
        default: "",
    }
  },
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null);
    const displayedUsers = ref<User[]>(props.users);
    const isLoadingMore = ref(false);
     
    // Load more users from API
    const loadMoreUsers = async () => {
      isLoadingMore.value = true;
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=${resultsPerPage}`);
        const newUsers = response.data.results;
        displayedUsers.value = [...displayedUsers.value,...newUsers];
        emit("updateUserList", displayedUsers.value);
      } catch (error) {
        console.log(error);
      } finally {
        isLoadingMore.value = false;
      }
    };
    
    // Handle scroll event and load more users when reaching the bottom
    const handleScroll = () => {
      const element = container.value;
      if(element instanceof HTMLElement) {
      const scrollTop = element.scrollTop
      const clientHeight = element.clientHeight
      const scrollHeight = element.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMoreUsers()
      }
    }
    }

    const selectUser = (user: User) => {
      emit("selected", user);
    };

    // watch for changes in the users array and scroll to the top
    watch(
      () => props.users,
      () => {
        displayedUsers.value = props.users;
      },
    );

    provide("displayedUsers", displayedUsers);

    return {
      container, 
      isLoadingMore,
      displayedUsers,
      handleScroll,
      selectUser,
    };
  },
});
</script>


