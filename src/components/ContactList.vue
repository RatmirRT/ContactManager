<template>
  <div class="contact_list">
    <TransitionGroup name="user-list">
      <contact-item
        v-for="user of usersList"
        :key="user.id"
        :userData="user"
        @remove="removeUser"
        @update="updateUser"
      ></contact-item>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import ContactItem from '@/components/ContactItem.vue'
import type { userData } from '@/service/InterfaceUserData'

export default defineComponent({
  name: 'contactList',
  components: { ContactItem },
  props: {
    usersList: {
      type: Array as PropType<userData[]>,
      reqired: true
    }
  },
  methods: {
    removeUser(userData: userData) {
      this.$emit('remove', userData)
    },
    updateUser(updatedData: userData) {
      this.$emit('update', updatedData)
    }
  }
})
</script>

<style scoped>
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.3s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
