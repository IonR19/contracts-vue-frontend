<template>
  <div class="container-fluid">
    <div class="row">
      <AppForm @form-input="assignValues"></AppForm>
      <AppImage @file-selected="assignFile"></AppImage>
      <button @click="submitForm" class="btn btn-primary btn-lg mt-5 col-6 offset-3">حفظ</button>
      <div class="mt-5"></div>
      <div v-if="isLoading">
        <h3 class="text-center" :class="{ 'text-success': uploadStatusText === '100 %' }">{{ uploadStatusText }}</h3>
      </div>
      <div v-if="errorCreating">
        <h3 class="text-center sucesss">{{ errorCreating }}</h3>
      </div>
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

<script lang="ts">
import Vue from 'vue'
import AppImage from './ContractsFormImage.vue'
import AppForm from './ContractsFormGroup.vue'
import axios from '../axios/axios-server'
export default Vue.extend({
  computed: {
    isOrder() {
      return this.$route.path.startsWith('/orders')
    },
    uploadStatusText() {
      return this.uploadStatus
    },
  },
  data() {
    return {
      formData: {
        // contractNumber: null,
        // contractName: null,
        // company: null,
        // startDate: null,
        // endDate: null,
      },
      file: '',
      isLoading: true,
      uploadStatus: null,
      errorCreating: false,
    }
  },
  methods: {
    assignFile(data) {
      this.file = data
    },
    assignValues(data) {
      this.formData = data
    },
    async submitForm() {
      this.isLoading = true
      this.errorCreating = ''
      const formData = new FormData()
      // add validation to child elements and send ok status to parents
      for (const key in this.formData) {
        if (this.formData[key]) {
          const trimmedValue = this.formData[key].trim()
          if (trimmedValue) {
            formData.append(key, this.formData[key])
          }
        }
      }
      if (this.file) {
        formData.append('documentFile', this.file)
      }
      formData.append('isOrder', this.isOrder)
      axios
        .post('contracts/add', formData, {
          onUploadProgress: e => {
            if (e.lengthComputable) {
              this.uploadStatus = `${Math.floor((e.loaded / e.total) * 100)} %`
            }
          },
        })
        .catch(e => {
          this.isLoading = false
          this.errorCreating = e.message
          console.log(e.message)
          //display message
        })
    },
  },
  components: {
    AppImage,
    AppForm,
  },
})
</script>

<style></style>
