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

<script>
import axios from "../axios/axios-server";

export default {
  data() {
    return {
      fileName: "",
      fileContent: "",
    };
  },
  computed: {
    displayFileName() {
      return this.fileName ? this.fileName : "Choose File";
    },
  },
  props: [],
  methods: {
    handleSelectFile(event) {
      const file = event.target.files[0];
      this.fileName = file.name;
      this.fileContent = URL.createObjectURL(file);
      this.$emit("file-selected", file);
    },
    /**
     * obsolete method, upload is handled in the parent component
     */
    handleFileChange(event) {
      const file = event.target.files[0];
      this.fileName = file.name;
      const FormData = new FormData();
      FormData.append("files", file);
      axios
        .post("/fileuploads", FormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert("success");
          console.log(res);
        })
        .catch((err) => {
          //log error
          console.log(err);
        });
      // this.viewDocument(file);
    },
  },
};
</script>

<style></style>
