<template>
  <td :colspan="colsize">
    {{ data }}
    <slot></slot>
  </td>
</template>

<script>
export default {
  props: {
    colsize: {
      default: 1,
    },
    data: {
      default: null,
    },
  },
};
</script>

<style></style>
