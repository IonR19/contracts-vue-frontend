<template>
  <thead>
    <tr scope="row">
      <th v-for="(title, i) in titles" :key="i">
        {{ title }}
      </th>
      <slot />
    </tr>
  </thead>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    titles: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style></style>
