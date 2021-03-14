<template>
  <div class="backdrop">
    <div class="card">
      <div class="card-header">
        <loading-screen v-if="isLoading"></loading-screen>
        <slot name="head"></slot>
      </div>
      <div class="card-body">
        <slot name="message"> </slot>
        <slot name="action"> </slot>
      </div>
      <div class="card-footer">
        <slot name="head"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import loadingScreen from "./Loading Screen";
export default {
  props: {
    isLoading: {
      default: false,
    },
  },
  components: {
    loadingScreen,
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 5000;
  background: rgba(0, 0, 0, 0.55);
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &>div {
      display: flex;
      justify-content: center;
  }
}
</style>
