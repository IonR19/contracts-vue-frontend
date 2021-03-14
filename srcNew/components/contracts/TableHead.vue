<template>
  <tr scope="row">
    <slot></slot>
  </tr>
</template>

<script>
export default {
  inject: {
    colSizes: {
      default: (() => {
        var arr = [];
        for (let i = 0; i < 10; ++i) arr[i] = 1;
      })(),
    },
  },
};
</script>

<style></style>
