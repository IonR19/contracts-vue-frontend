<template>
  <div class="col-12">
    <form class="form-group" @input="emitFormInput">
      <div class="input-group mt-3">
        <label for="contractNumber" class="input-group-text"><i class="fas fa-font"></i></label>
        <input
          type="text"
          name="contractNumber"
          id="contractNumber"
          class="form-control rtl"
          v-model="contractNumber"
        />
        <label for="contractNumber" class="input-group-text">رقم العقد</label>
      </div>
      <div class="input-group mt-3">
        <label for="contractName" class="input-group-text"><i class="fas fa-font"></i></label>
        <input type="text" name="contractName" id="contractName" class="form-control rtl" v-model="contractName" />
        <label for="contractName" class="input-group-text">اسم العقد</label>
      </div>
      <div class="input-group mt-3">
        <label for="company" class="input-group-text"><i class="fas fa-font"></i></label>
        <input type="text" name="company" id="company" class="form-control rtl" v-model="company" />
        <label for="company" class="input-group-text">الشركة المنفذة</label>
      </div>
      <div class="row mt-3">
        <div class="col-12 col-md-6">
          <div class="input-group">
            <label for="endDate" class="input-group-text"><i class="fas fa-calendar-week"></i></label>
            <input type="date" name="endDate" id="endDate" class="form-control rtl" v-model="endDate" />
            <label for="endDate" class="input-group-text">تاريخ النهاية</label>
          </div>
        </div>
        <div class="col-12 col-md-6 mt-3 mt-md-0">
          <div class="input-group">
            <label for="startDate" class="input-group-text"><i class="fas fa-calendar-week"></i></label>
            <input type="date" name="startDate" id="startDate" class="form-control rtl" v-model="startDate" />
            <label for="startDate" class="input-group-text">تاريخ البداية</label>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="input-group">
          <label for="payment" class="input-group-text"><i class="fas fa-sort-numeric-up-alt"></i></label>
          <input type="text" name="payment" id="payment" class="form-control" v-model="payment" />
          <label for="payment" class="input-group-text">القيمة المالية</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['contractNumberProp', 'contractNameProp', 'companyProp', 'startDateProp', 'endDateProp', 'paymentProp'],
  data() {
    return {
      contractNumber: this.contractNumberProp || null,
      contractName: this.contractNameProp || null,
      company: this.companyProp || null,
      startDate: this.startDateProp || null,
      endDate: this.endDateProp || null,
      payment: this.paymentProp || null,
    }
  },
  methods: {
    emitFormInput() {
      const formData = {
        contractNumber: this.contractNumber,
        contractName: this.contractName,
        company: this.company,
        startDate: this.startDate,
        endDate: this.endDate,
        payment: this.payment,
      }
      this.$emit('form-input', formData)
    },
  },
}
</script>

<style></style>
