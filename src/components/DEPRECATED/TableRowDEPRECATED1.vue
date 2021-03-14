<template>
<div>

</div>
  <!-- <tr >
    <slot name="head"></slot>
    <td :colspan="colSizes[index]" v-for="(item, index) in data" :key="index">
      {{ item }}
    </td>
    <slot name="tail"></slot>
  </tr> -->
</template>

<script>
export default {
  inject:['colSizes'],
  props: {
    data: {
      default: () => [],
    },
  },
};
</script>

<style></style>
