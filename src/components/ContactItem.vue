<template>
  <div class="user_data">
    <div class="desc">
      <p>
        Name: <b>{{ userData.name }}</b>
      </p>
      <p>
        Phone number: <b>{{ userData.phone }}</b>
      </p>
      <p>
        Email: <b>{{ userData.email }}</b>
      </p>
    </div>
    <div class="actions">
      <button title="Удалить" class="delete" @click="removeUser(userData)"></button>
      <button title="Редактировать" class="edit" @click="showForm = true"></button>
    </div>
    <modal-dialog v-model:show="showForm" v-if="showForm">
      <contact-form :userContact="userData" @getContact="editedContact"></contact-form>
    </modal-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { userData } from '@/service/InterfaceUserData'
import ModalDialog from '@/components/UI/modalDialog.vue'
import ContactForm from '@/components/ContactForm.vue'

export default defineComponent({
  name: 'contactItem',
  components: { ModalDialog, ContactForm },
  props: {
    userData: {
      type: Object as PropType<userData>,
      required: true
    }
  },
  data() {
    return {
      showForm: false
    }
  },
  methods: {
    removeUser(userData: userData) {
      this.$emit('remove', userData)
    },
    editedContact(updatedData: userData) {
      this.showForm = false
      this.$emit('update', updatedData)
    }
  }
})
</script>

<style scoped>
.user_data {
  padding: 20px;
  border: 1px solid var(--gray);
  border-radius: 15px;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user_data:last-child {
  border-bottom: 1px solid var(--gray);
}

.desc p {
  font-size: 18px;
  margin-bottom: 10px;
}

.desc p:last-child {
  margin-bottom: 0;
}

.actions button {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid var(--black);
  margin-right: 5px;
}

.actions button:last-child {
  margin-right: 0;
}

.actions button.delete {
  position: relative;
}

.actions button.delete::before,
.actions button.delete::after {
  content: '';
  display: block;
  position: absolute;
  width: 15px;
  height: 2px;
  background-color: var(--black);
  top: 50%;
  left: 30%;
}

.actions button.delete::before {
  transform: rotate(-45deg);
}

.actions button.delete::after {
  transform: rotate(45deg);
}

.actions .edit {
  background-image: url(@/assets/img/edit.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
}
</style>
