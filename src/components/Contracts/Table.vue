<template>
  <table class="table table-striped">
    <table-head :titles="titles"></table-head>
    <table-body></table-body>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'
import ContractModal from '../../model/Contract'
import { mapActions, mapGetters } from 'vuex'
export default Vue.extend({
  watch: {
    $route() {
      this.$store.commit('contracts/records', null)
    },
  },
  destroyed() {
    this.$store.commit('contracts/records', null)
  },
  computed: {
    ...mapGetters('contracts', ['isGettingData', 'records', 'headers']),
    titles() {
      return [...this.headers.map(el => ContractModal.Attributes[el].titleAr), 'ادوات']
    },
  },
  methods: {
    ...mapActions({
      loadData: 'contracts/downloadRecords',
    }),
  },
  components: {
    TableHead,
    TableBody,
  },
})
</script>
