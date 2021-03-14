<template>
  <div class="container-fluid">
    <div class="row">
      <app-form @form-input="assignValues"></app-form>
      <app-image @file-selected="AssignFile"></app-image>
      <button @click="submitForm" class="btn btn-primary btn-lg mt-5">حفظ</button>
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
import Axios from "../axios/axios-server";
import AppForm from "./ReceiptsFormGroup";
import AppImage from "./ReceiptsFormImage";
export default {
  data() {
    return {
      formData: {
        // serial: null,
        // payment: null,
        // date: null,
      },
      file: "",
    };
  },
  methods: {
    AssignFile(data) {
      this.file = data;
    },
    assignValues(data) {
      this.formData = data;
    },
    submitForm() {
      const formData = new FormData();
      // add validation to child elements and send ok status to parents
      for (const key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      formData.append("ContractId", 1);
      if (this.file) {
        formData.append("documentFile", this.file);
      }
      Axios.post("/receipts/add", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err.message));
    },
  },
  components: {
    AppImage,
    AppForm,
  },
};
</script>

<style></style>
