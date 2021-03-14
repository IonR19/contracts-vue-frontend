<template>
  <div class="backdrop">
    <div class="card">
      <slot name="message"></slot>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 5000;
  background: rgba(0, 0, 0, 0.55);
}
</style>
