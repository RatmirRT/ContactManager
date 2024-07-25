<template>
  <form @submit.prevent class="form">
    <input type="text" :value="name" placeholder="Имя..." @input="nameInput" />
    <input
      type="text"
      :value="phone"
      placeholder="Номер телефона..."
      inputmode="numeric"
      @input="phoneInput"
      required
    />
    <input type="mail" placeholder="Email..." v-model="email" />
    <button @click="setContact">Добавить</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { userData } from '@/service/InterfaceUserData'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'FormDialog',
  props: {
    userContact: {
      type: Object as PropType<userData>
    }
  },
  data() {
    return {
      name: this.userContact?.name || '',
      phone: this.userContact?.phone || '',
      email: this.userContact?.email || ''
    }
  },
  methods: {
    setContact() {
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        id: this.userContact?.id
      }
      this.$emit('getContact', data)
    },

    nameInput(event: Event) {
      const target = event.target as HTMLInputElement
      const value = target.value
      const correctValue = this.nameFilter(value)
      this.name = correctValue
      target.value = correctValue
    },

    nameFilter(value: string) {
      const pattern = /^[^ ].{0,29}$/
      const test = pattern.test(value)
      if (test || value === '') {
        return value
      } else {
        let correctValue = value.slice(0, -1)
        if (!pattern.test(correctValue)) {
          correctValue = this.nameFilter(correctValue)
        }
        return correctValue
      }
    },

    phoneInput(event: Event) {
      const target = event.target as HTMLInputElement
      const value = target.value
      const correctValue = this.phoneFilter(value)
      this.phone = correctValue
      target.value = correctValue
    },

    phoneFilter(value: string) {
      const pattern = /^\+?\d{0,11}$/
      const test = pattern.test(value)
      if (test) {
        return value
      } else {
        let correctValue = value.slice(0, -1)
        if (!pattern.test(correctValue)) {
          correctValue = this.phoneFilter(correctValue)
        }
        return correctValue
      }
    }
  }
})
</script>

<style scoped>
.form {
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.form input {
  margin-bottom: 15px;
  width: 100%;
}

.form button {
  border: 2px solid var(--black);
  width: fit-content;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 700;
  color: var(--black);
}

.form button:hover {
  background-color: var(--black);
  color: var(--white);
}
</style>
