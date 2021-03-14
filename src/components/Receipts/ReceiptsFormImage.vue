<template>
  <div class="px-3">
    <div class="col-12 mt-5 px-5">
      <div class="card">
        <div class="card-header text-center">المرفقات</div>
        <div class="card-body">
          <iframe :src="fileContent" width="100%" height="250rem" />
        </div>
      </div>
    </div>
    <div class="form-file mt-3">
      <input
        type="file"
        name="document"
        id="file"
        class="form-file-input"
        @change="handleSelectFile"
        accept="application/pdf, image/png, image/jpg, image/jpeg"
      />
      <label for="file" class="form-file-label">
        <span class="form-file-text">{{ displayFileName }}</span>
        <span class="form-file-button">رفع ملف</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      fileName: '',
      fileContent: '',
    }
  },
  computed: {
    displayFileName() {
      return this.fileName ? this.fileName : 'Choose File'
    },
  },
  inject: ['captureInput'],
  methods: {
    handleSelectFile(event) {
      const file = event.target.files[0]
      this.captureInput({ documentFile: file })
      this.fileName = file.name
      this.fileContent = URL.createObjectURL(file)
      // this.$emit('file-selected', file)
    },
  },
})
</script>

<style></style>
