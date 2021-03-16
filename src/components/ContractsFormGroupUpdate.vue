<template>
  <div class="col-12">
    <form class="form-group" @submit.prevent="submitForm" ref="contractUpdateForm">
      <div class="input-group mt-3">
        <label for="contractNumber" class="input-group-text"><i class="fas fa-font"></i></label>
        <input
          required
          minlength="3"
          type="text"
          name="contractNumber"
          id="contractNumber"
          class="form-control rtl"
          data-id="contractNumber"
        />
        <label for="contractNumber" class="input-group-text">رقم العقد</label>
      </div>
      <div class="input-group mt-3">
        <label for="contractName" class="input-group-text"><i class="fas fa-font"></i></label>
        <input
          required
          minlength="1"
          type="text"
          name="contractName"
          id="contractName"
          class="form-control rtl"
          data-id="contractName"
        />
        <label for="contractName" class="input-group-text">اسم العقد</label>
      </div>
      <div class="input-group mt-3">
        <label for="company" class="input-group-text"><i class="fas fa-font"></i></label>
        <input required type="text" name="company" id="company" class="form-control rtl" data-id="company" />
        <label for="company" class="input-group-text">الشركة المنفذة</label>
      </div>
      <div class="row mt-3">
        <div class="col-12 col-md-6">
          <div class="input-group">
            <label for="endDate" class="input-group-text"><i class="fas fa-calendar-week"></i></label>
            <input
              required
              minlength="1"
              placeholder="yyyy-mm-dd"
              type="date"
              name="endDate"
              id="endDate"
              class="form-control rtl"
              data-id="endDate"
            />
            <label for="endDate" class="input-group-text">تاريخ النهاية</label>
          </div>
        </div>
        <div class="col-12 col-md-6 mt-3 mt-md-0">
          <div class="input-group">
            <label for="startDate" class="input-group-text"><i class="fas fa-calendar-week"></i></label>
            <input
              required
              placeholder="yyyy-mm-dd"
              type="date"
              name="startDate"
              id="startDate"
              class="form-control rtl"
              data-id="startDate"
            />
            <label for="startDate" class="input-group-text">تاريخ البداية</label>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="input-group">
          <label for="payment" class="input-group-text"><i class="fas fa-sort-numeric-down-alt"></i></label>
          <input
            required
            minlength="3"
            type="text"
            name="payment"
            id="payment"
            class="form-control"
            data-id="payment"
          />
          <label for="payment" class="input-group-text">القيمة المالية</label>
        </div>
      </div>
      <div class="row mt-3">
        <div class="input-group">
          <label for="notes" class="input-group-text">
            <i class="fas fa-align-left"></i>
          </label>
          <textarea class="form-control" name="notes" id="notes" cols="30" rows="10" data-id="notes"></textarea>
          <label for="notes" class="input-group-text">ملاحظات</label>
        </div>
      </div>
      <button class="btn btn-primary mt-5 col-2 offset-5" :disabled="isUpdatingData">{{ saveButtonText }}</button>
    </form>
    <div v-if="updateStatus" class="row">
      <h2 class="h2 text-center">{{ updateStatus }}</h2>
      <router-link :to="searchPage" class="btn btn-outline-primary col-2 offset-5 text-body">رجوع</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default Vue.extend({
  mounted() {
    this.initPage()
    let inputs: (HTMLInputElement | HTMLTextAreaElement)[] = [
      ...this.$refs['contractUpdateForm'].querySelectorAll('input, textarea'),
    ]
    inputs.forEach(inp => {
      inp.style.direction = 'rtl'
    })
  },
  data() {
    return {
      contractName: null,
      contractNumber: null,
      company: null,
      startDate: null,
      endDate: null,
      payment: null,
      updateStatus: '',
    }
  },
  computed: {
    ...mapGetters('contracts', ['record', 'isGettingData', 'isUpdatingData']),
    searchPage() {
      return `/${this.record?.isOrder ? 'orders' : 'contracts'}/search`
    },
    id() {
      return this.$route.params.id
    },
    saveButtonText() {
      return (this.isUpdatingData) ? 'جاري الحفظ...' : 'حفظ'
    },
  },
  methods: {
    initPage() {
      //sets page data
      const form = this.$refs['contractUpdateForm'] as HTMLFormElement
      const inputs = form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>
      inputs.forEach(input => {
        const dbName = input.dataset.id
        if (input.getAttribute('type') === 'date') {
          if (this.record[dbName]) {
            input.value = moment(this.record[dbName]).format('yyyy-MM-DD')
          }
        } else {
          input.value = this.record?.[dbName]
        }
      })
    },
    async submitForm(e: any) {
      const updateObj = {}
      e.target.elements.forEach((item: HTMLInputElement) => {
        if (item.name) {
          const { name, value } = item
          updateObj[name] = value
        }
      })

      const res = await this.$store.dispatch('contracts/updateRecord', { id: this.id, param: updateObj })
      this.updateStatus = res === 'ok' ? 'تم الحفظ' : res
    },
  },
})
</script>

<style></style>
