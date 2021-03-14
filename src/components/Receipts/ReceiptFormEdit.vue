<template>
  <div class="container my-4">
    <div class="col-12 col-lg-12 d-flex flex-column">
      <div class="input-group">
        <input
          type="text"
          name="contract-number"
          id="contract-number"
          class="form-control"
          disabled
          :value="contract"
        />
        <label for="contract-number" class="input-group-text">رقم العقد</label>
      </div>
      <form ref="myForm" class="form-group" @submit.prevent="submitUpdate">
        <div class="input-group mt-3">
          <label for="serial" class="input-group-text"><i class="fas fa-sort-numeric-up"></i></label>
          <input required type="number" name="serial" id="serial" class="form-control rtl" data-id="monthlySerial" />
          <label for="serial" class="input-group-text">مسلسل</label>
        </div>
        <div class="input-group mt-3">
          <label for="amount" class="input-group-text"><i class="fas fa-dollar-sign"></i></label>
          <input required type="text" name="amount" id="amount" class="form-control rtl" data-id="payment" />
          <label for="amount" class="input-group-text">القيمة المالية</label>
        </div>
        <div class="input-group mt-3">
          <label for="date" class="input-group-text"><i class="fas fa-calendar-week"></i></label>
          <input
            required
            type="date"
            name="date"
            id="date"
            class="form-control rtl"
            data-id="enterDate"
            placeholder="yyyy-mm-dd"
          />
          <label for="date" class="input-group-text">تاريخ التسجيل</label>
        </div>
        <button class="btn btn-primary btn-lg btn-block text-center my-5">حفظ</button>
      </form>
      <div v-if="updateStatus">
        <h2 class="h2 text-center">{{ updateStatus }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  watch: {
    $route() {
      this.initPage()
    },
  },
  created() {
    this.initPage()
  },
  data() {
    return {
      updateStatus: '',
    }
  },
  computed: {
    ...mapGetters('contracts', { contractRecord: 'record' }),
    ...mapGetters('receipts', ['isUpdatingData', 'isGettingData', 'record']),
    contractId() {
      return this.$route.params.contractId
    },
    contract() {
      return this.contractRecord?.contractNumber ?? 'loading...'
    },
    id() {
      return this.$route.params.id
    },
  },
  methods: {
    async initPage() {
      await Promise.allSettled([
        this.$store.dispatch('contracts/downloadRecord', this.contractId),
        this.$store.dispatch('receipts/downloadRecord', this.id),
      ])
      const inputEls = (this.$refs.myForm as HTMLFormElement).querySelectorAll('input')
      inputEls.forEach(el => {
        if (el.getAttribute('type') === 'date' && this.record[el.dataset.id]) {
          const dateStr = moment(new Date(this.record[el.dataset.id])).format('yyyy-MM-DD')
          el.value = dateStr
        } else {
          el.value = this.record[el.dataset.id]
        }
      })
    },
    async submitUpdate(e: Event) {
      const inputEls = (e.target as HTMLFormElement).querySelectorAll('input')
      const update: { monthlySerial?: number; paymet?: number; enterDate?: Date | String } = {}
      inputEls.forEach((el: HTMLInputElement) => {
        if (el.dataset?.id) {
          update[el.dataset.id] = el.value
        }
      })
      this.updateStatus = ''
      const res = await this.$store.dispatch('receipts/updateRecord', { id: this.id, updateParams: update })
      this.updateStatus = res === 'ok' ? 'تم الحفظ' : res
    },
  },
})
</script>
