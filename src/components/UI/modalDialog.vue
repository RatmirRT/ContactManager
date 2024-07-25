<template>
  <div class="modal_section">
    <div class="modal_window">
      <button class="modal_close" @click="hideModal"></button>
      <slot></slot>
    </div>
    <div class="modal_back" @click="hideModal"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'modalWindow',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false)
    }
  },
  beforeUnmount() {
    this.hideModal()
  }
})
</script>

<style scoped>
.modal_section {
  position: absolute;
}

.modal_window {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid var(--gray);
  border-radius: 20px;
  background: var(--white);
  padding: 45px 45px 30px 45px;
  width: fit-content;
  z-index: 10;
}

.modal_back {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: var(--black);
  opacity: 0.6;
}

.modal_close {
  position: absolute;
  right: 15px;
  top: 15px;
  background-color: transparent;
  border: none;
  height: 25px;
  width: 25px;
}

.modal_close:before,
.modal_close:after {
  content: '';
  width: 20px;
  height: 2px;
  background-color: var(--black);
  display: block;
}

.modal_close:before {
  transform: rotate(45deg) translate(2px);
}

.modal_close:after {
  transform: rotate(-45deg) translate(2px);
}
</style>
