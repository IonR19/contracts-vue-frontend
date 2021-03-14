<template>
  <div class="csmodal-backdrop">
    <div class="csmodal-dialog">
      <div class="csmodal-dialog-head">
        <h2 class="mx-5">{{ msg }}</h2>
        <button class="btn btn-danger btn-sm" @click="emitRequestClose">X</button>
      </div>
      <div class="csmodal-dialog-body">
        <slot name="body"></slot>
      </div>
      <div class="csmodal-dialog-footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      default: 'هل أنت متاكد؟',
    },
  },
  methods: {
    emitRequestClose() {
      // console.log('please close me', 'Contracts/Modal.vue') 
      this.$emit('request-close')
    },
  },
}
</script>

<style lang="scss">
.csmodal {
  &-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
  &-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &-head {
      padding: 6px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom: 1px solid #dee2e6;
      background: white;
      display: flex;
      align-items: center;
      padding: 0.01rem 1rem;
      button {
        justify-self: flex-start;
      }
      h2 {
        flex-grow: 1;
        text-align: center;
      }
    }
    &-body {
      padding: 6px;
      // min-width: 400px;
      background: white;
    }
    &-footer {
      border-top: 1px solid #dee2e6;
      padding: 6px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      // background: #ccc;
    }
  }
}
</style>
