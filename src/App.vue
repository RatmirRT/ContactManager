<template>
  <main>
    <div class="container">
      <div class="action_section">
        <div class="create">
          <button @click="showForm = true">Создать</button>
        </div>
        <div class="search">
          <input type="text" v-model="searchQuery" placeholder="Поиск..." />
        </div>
      </div>
      <modal-dialog v-model:show="showForm" v-if="showForm">
        <contact-form @getContact="addNewContact"></contact-form>
      </modal-dialog>
      <contact-list
        :usersList="contactsList"
        @remove="removeUser"
        @update="updateUser"
      ></contact-list>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContactList from '@/components/ContactList.vue'
import fetchRequest from '@/service/fetch'
import type { userData } from '@/service/InterfaceUserData'
import ModalDialog from '@/components/UI/modalDialog.vue'
import ContactForm from '@/components/ContactForm.vue'

export default defineComponent({
  components: { ContactList, ModalDialog, ContactForm },
  data() {
    return {
      usersData: [] as userData[],
      showForm: false,
      id: 0,
      searchQuery: ''
    }
  },
  computed: {
    contactsList() {
      const usersList: userData[] = this.usersData.filter((user) => {
        const matchesName = user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) // проверка по имени
        const matchesPhone = user.phone.toLowerCase().includes(this.searchQuery.toLowerCase()) // проверка по номеру телефона
        const matchesMail = user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) // проверка по почте
        return matchesPhone || matchesName || matchesMail
      })
      return usersList
    }
  },
  watch: {
    usersData(newVal) {
      const newContactList = JSON.stringify(newVal)
      localStorage.setItem('contactList', newContactList)
    }
  },
  mounted() {
    const usersList = localStorage.getItem('contactList')
    if (usersList && usersList !== '[]') {
      console.log(usersList)
      this.usersData = JSON.parse(usersList)
    } else {
      this.getUsersData()
    }
  },
  methods: {
    updateUser(updatedData: userData) {
      this.usersData = this.usersData.map((data) => {
        if (data.id === updatedData.id) {
          return updatedData
        }
        return data
      })
    },

    addNewContact(data: userData) {
      const newUser = data
      newUser.id = ++this.id
      this.usersData.unshift(newUser)
      this.showForm = false
    },

    async getUsersData() {
      const url = 'https://jsonplaceholder.typicode.com/users'
      const response = await fetchRequest(url)
      if (response) {
        this.usersData = this.userDataNormalize(response)
        const lastId = Math.max(...this.usersData.map((user) => user.id))
        this.id = lastId
      }
    },

    userDataNormalize(nonNormalizeData: Array<userData>) {
      const normalizeData = [] as userData[]
      nonNormalizeData.forEach((element) => {
        const normalizedPhone = element.phone.split(' ')[0].replace(/[.\-()/ ]/g, '') // избавляемся от лишнего: точки, скобки, тире. Приводим к одному виду
        const data = {
          id: element.id,
          name: element.name,
          phone: normalizedPhone,
          email: element.email
        }
        normalizeData.push(data)
      })
      return normalizeData
    },

    removeUser(userData: userData) {
      const result = this.usersData.filter((user) => user.id !== userData.id)
      this.usersData = result
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Arial;
}

:root {
  --gray: #cecdcd;
  --white: #fff;
  --black: #000;
}

button {
  background-color: transparent;
  border: none;
}

button:hover {
  cursor: pointer;
}

input {
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  border: 2px solid var(--gray);
}

input:focus {
  border: 2px solid var(--black);
  outline: none;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.action_section {
  display: block;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.create button {
  background-color: black;
  padding: 15px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 700;
}

.search input {
  padding: 5px;
  font-size: 16px;
}
</style>
