<template>
  <div class="col-12 col-lg-12 d-flex flex-column">
    <form class="form-group" @input="emitFormInput">
      <div class="input-group">
        <input
          type="text"
          name="contract-number"
          id="contract-number"
          class="form-control rtl"
          disabled
          :value="defaultValues.contractNumber"
        />
        <label for="contract-number" class="input-group-text">رقم العقد</label>
      </div>
      <div class="input-group mt-3">
        <label for="serial" class="input-group-text"><i class="fas fa-sort-numeric-up"></i></label>
        <input type="number" name="serial" id="serial" class="form-control rtl" v-model="serial" />
        <label for="serial" class="input-group-text">مسلسل</label>
      </div>
      <div class="input-group mt-3">
        <label for="amount" class="input-group-text"><i class="fas fa-dollar-sign"></i></label>
        <input type="number" name="amount" id="amount" class="form-control rtl" v-model="payment" />
        <label for="amount" class="input-group-text">القيمة المالية</label>
      </div>
      <div class="input-group mt-3">
        <label for="date" class="input-group-text"><i class="fas fa-calendar-week"></i></label>
        <input type="date" name="date" id="date" class="form-control rtl" v-model="date" />
        <label for="date" class="input-group-text">تاريخ التسجيل</label>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from "../axios/axios-server";
export default {
  data() {
    return {
      serial: null,
      payment: null,
      date: null,
      fileName: "",
      fileContent: "",
      defaultValues: {
        contractNumber: "رقم",
      },
      selectedFile: "",
    };
  },
  methods: {
    emitFormInput() {
      const formData = {
        monthlySerial: this.serial,
        payment: this.payment,
        enterDate: this.date,
      };
      this.$emit("form-input", formData);
    },
    // handleFileChange(event) {
    //   const file = event.target.files[0];
    //   this.selectedFile = file.name;
    //   const uploadedFiles = new FormData();
    //   uploadedFiles.append("files", file);
    //   axios
    //     .post("/fileupload", uploadedFiles, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((res) => {
    //       alert("success");
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       //log error
    //       console.log(err);
    //     });
    //   this.viewDocument(file);
    // },
  },
};
</script>

<style></style>
