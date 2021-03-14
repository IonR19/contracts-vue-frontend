<template>
  <table class="table table-striped">
    <thead>
      <th v-for="(head, index) in tableHead" :key="index">
        <td> {{head}} </td>
      </th>
    </thead>
    <tbody>
      <tr v-for="record in tableBody" :key="record.id" >
        <td v-for="(recordItem , i)in record" :key="i">
          {{recordItem}}
        </td>
      </tr>
      <v-slot></v-slot>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    tableHead: [],
    tableBody: [],
  },
})
</script>

<style></style>
