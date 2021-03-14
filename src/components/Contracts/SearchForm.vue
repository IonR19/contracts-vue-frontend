<template>
  <form class="container-fluid" @submit.prevent="submitForm" id="search-forum" ref="search-form">
    <div class="row">
      <div class="input-group mt-3 col-12">
        <label for="contractName" class="input-group-text"><i class="fas fa-font"></i></label>
        <input type="text" name="contractName" id="contractName" class="form-control rtl" v-model.lazy="contractName" />
        <label for="contractName" class="input-group-text">اسم العقد</label>
      </div>
      <div class="input-group mt-3 col-12">
        <label for="contractNumber" class="input-group-text"><i class="fas fa-font"></i></label>
        <input
          type="text"
          name="contractNumber"
          id="contractNumber"
          class="form-control rtl"
          v-model.lazy="contractNumber"
        />
        <label for="contractNumber" class="input-group-text">رقم العقد</label>
      </div>
      <div class="input-group mt-3 col-12">
        <label for="company" class="input-group-text"><i class="fas fa-font"></i></label>
        <input type="text" name="company" id="company" class="form-control rtl" v-model.lazy="company" />
        <label for="company" class="input-group-text">الشركة</label>
      </div>
    </div>
    <div class="row">
      <div class="input-group mt-3 col rtl">
        <div class="form-check form-switch col-2 my-2">
          <input class="form-check-input" type="checkbox" id="endDate Before" v-model.lazy="endDateSwh" />
          <label class="form-check-label" for="endDateBefore">{{ endDateSwitch }}</label>
        </div>
        <label for="endDate" class="input-group-text"><i class="fas fa-calendar-week"></i></label>
        <input type="date" name="endDate" id="endDate" class="form-control" v-model="endDate" />
        <label for="endDate" class="input-group-text">تاريخ النهاية</label>
      </div>
      <div class="input-group mt-3 col rtl">
        <div class="form-check form-switch col-2 my-2">
          <input class="form-check-input" type="checkbox" id="startDateBefore" v-model.lazy="startDateSwh" />
          <label class="form-check-label" for="startDateBefore">{{ startDateSwitch }}</label>
        </div>
        <label for="startDate" class="input-group-text"><i class="fas fa-calendar-week"></i></label>
        <input type="date" name="startDate" id="startDate" class="form-control" v-model.lazy="startDate" />
        <label for="startDate" class="input-group-text">تاريخ البداية</label>
      </div>
    </div>
    <div class="offset-5 col-6 my-3">
      <button :disabled="isGettingData" class="btn btn-primary btn-lg">بحث</button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  mounted() {
    // this.$refs['search-form'].addEventListener('submit', this.submitForm)
  },
  beforeDestroy() {
    // this.$refs['search-form'].removeEventListener('submit', this.submitForm)
  },
  data() {
    return {
      company: undefined,
      startDate: undefined,
      endDate: undefined,
      contractName: undefined,
      contractNumber: undefined,
      startDateSwh: false,
      endDateSwh: true,
    }
  },

  computed: {
    startDateSwitch() {
      return !this.startDateSwh ? 'قبل' : 'بعد'
    },
    endDateSwitch() {
      return !this.endDateSwh ? 'قبل' : 'بعد'
    },
    isOrder() {
      return this.$route.path.startsWith('/orders')
    },
    ...mapGetters('contracts', ['isGettingData']),
  },
  methods: {
    submitForm() {
      const searchParams = {}
      ;[
        'contractName',
        'contractNumber',
        'startDate',
        'endDate',
        'endDateBefore',
        'startDateBefore',
        'startDateSwh',
        'endDateSwh',
        'company',
        'isOrder',
      ].forEach(param => {
        if (this[param] !== undefined) {
          searchParams[param] = this[param]
        }
      })
      this.$store.dispatch('contracts/searchRecords', searchParams)
    },
  },
})
</script>

<style lang="scss" scoped></style>
