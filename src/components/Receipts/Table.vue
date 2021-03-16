<template>
  <div>
    <h4 class="text-center mb-5">الفواتير</h4>
    <table class="table table-striped">
      <TableHead :titles="titles"></TableHead>
      <TableBody></TableBody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'
import ReceiptModal from '../../model/Receipt'
import { mapGetters } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapGetters('receipts', ['isGettingData', 'records', 'headers']),
    titles() {
      return [...this.headers.map(want => ReceiptModal.Attributes[want].titleAr), 'ادوات']
    },
  },
  components: {
    TableHead,
    TableBody,
  },
})
</script>

<style>
table {
  text-align: center;
}
</style>
