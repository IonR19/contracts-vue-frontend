<template>
  <div class="container-fluid">
    <div class="row">
      <app-form></app-form>
      <app-image></app-image>
      <button @click="submitForm" :disabled="isCreatingData" class="btn btn-primary btn-lg mt-5">
        {{ submitButtonText }}
      </button>
    </div>
    <div v-if="hasError">
      <h2 class="text-center">فشل الاضافة</h2>
    </div>
  </div>
  <!-- to do
  when finished
  load modal
  await finish upload
  if success
  button to return
  else
  button to retry
  
   -->
</template>

<script>
import { mapGetters } from 'vuex'
import AppForm from './ReceiptsFormGroup'
import AppImage from './ReceiptsFormImage'
export default {
  computed: {
    id() {
      return this.$route.params.id
    },
    ...mapGetters('contracts', ['record']),
    ...mapGetters('receipts', ['isCreatingData']),
    submitButtonText() {
      return this.isCreatingData ? 'جاري الحفظ' : 'حفظ'
    },
  },
  data() {
    return {
      formData: {},
      hasError: false,
    }
  },
  provide() {
    return {
      captureInput: input => {
        this.formData = Object.assign(this.formData, input)
      },
    }
  },
  inject: ['setReceiptAddMode', 'initPage'],
  methods: {
    async submitForm() {
      this.formData.ContractId = this.id
      const formData = new FormData()
      // add validation to child elements and send ok status to parents
      for (const key in this.formData) {
        formData.append(key, this.formData[key])
      }

      const response = await this.$store.dispatch('receipts/createRecord', formData)
      if (response === 'error') {
        this.hasError = true
      } else {
        this.hasError = false
        this.setReceiptAddMode(false)
        this.initPage()
      }
    },
  },
  components: {
    AppImage,
    AppForm,
  },
}
</script>

<style></style>
