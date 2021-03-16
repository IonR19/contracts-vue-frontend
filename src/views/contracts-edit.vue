<template>
  <div>
    <div class="card shadow p-4 my-4 mx-3">
      <p v-if="isGettingData">Loading Data ...</p>
      <p v-else-if="!record">No Report Found! Or Incorrect URL</p>
      <FormTable v-else> </FormTable>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormTable from '../components/ContractsFormGroupUpdate'

export default {
  watch: {
    $route() {
      this.downloadRecord()
    },
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    ...mapGetters('contracts', ['record', 'isGettingData']),
  },
  created() {
    this.downloadRecord()
  },
  methods: {
    downloadRecord() {
      this.$store.dispatch('contracts/downloadRecord', this.id)
    },
  },
  components: {
    FormTable,
  },
}
</script>
