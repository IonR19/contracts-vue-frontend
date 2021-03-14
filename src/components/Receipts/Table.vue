<template>
  <div>
    <h4 class="text-center mb-5">الفواتير</h4>
    <table class="table table-striped">
      <table-head :titles="titles"></table-head>
      <table-body></table-body>
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
