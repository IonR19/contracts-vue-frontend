<template>
  <div class="content-block dx-card responsive-paddings">
    <div v-if="isGettingData">
      <p>Loading</p>
    </div>
    <div v-else-if="!record">
      <p>No Contract with this id</p>
    </div>
    <receipts-form v-else></receipts-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ReceiptsForm from '../components/Receipts/ReceiptsForm'

export default {
  watch: {
    $route() {
      this.downloadRecord()
    },
  },
  created() {
    this.downloadRecord()
  },
  methods: {
    downloadRecord() {
      this.$store.dispatch('contracts/downloadRecord',  this.id)
    },
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    ...mapGetters('contracts',['isGettingData', 'record']),
  },
  components: {
    ReceiptsForm,
  },
}
</script>

<style lang="scss" scoped></style>
