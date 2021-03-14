<template>
  <div v-if="!hasFile">
    <p class="h2 text-center">لا يوجد مرفقات</p>
  </div>
  <div v-else-if="!file">
    <button :class="{ disabled: this.isGettingFile }" class="btn btn-lg btn-primary float-right" @click="downloadFile">
      {{ downloadFileButton }}
    </button>
  </div>
  <div v-else>
    <iframe :src="renderFileB" frameborder="0" width="100%" height="900px" allowfullscreen></iframe>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  watch: {
    $route() {
      this.unrenderFile()
    },
  },
  computed: {
    ...mapGetters('contracts', ['record', 'isGettingFile', 'file']),
    downloadFileButton() {
      return this.isGettingFile ? 'ال جاري التحميل...' : 'تحميل المرفقات'
    },
    id() {
      return this.$route.params.id
    },
    hasFile() {
      return this.record?.ContractAttachments?.length
    },
  },
  data() {
    return {
      renderFileB: null,
    }
  },
  methods: {
    renderFile() {
      this.renderFileB = URL.createObjectURL(this.file)
    },
    unrenderFile() {
      URL.revokeObjectURL(this.file)
      URL.revokeObjectURL(this.renderFileB)
      this.$store.commit('contracts/file', null)
    },
    async downloadFile() {
      if (!this.record?.ContractAttachments.length) {
        return alert('لا يوجد')
      }
      await this.$store.dispatch('contracts/downloadFile', this.record?.ContractAttachments[0].id)
      this.renderFile()
    },
  },
  beforeMount() {
    this.unrenderFile()
  },
})
</script>

<style></style>
