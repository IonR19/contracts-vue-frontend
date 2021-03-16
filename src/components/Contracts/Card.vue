<template>
  <div v-if="record" class="rtl">
    <div v-for="title in headersComplete" :key="title.ar" class="cell-container">
      <h5 class="cell-title text-right">
        {{ Attributes[title].titleAr }}
      </h5>
      <h5 class="cell-value text-center">
        {{ Attributes[title].render(record[title]) }}
      </h5>
      <div class="cell-break"></div>
    </div>
    <div class="cell-container">
      <h2 class="cell-title">ملاحظات</h2>
      <p class="cell-value h3 text-right d-flex justify-content-center align-items-center">{{ record['notes'] }}</p>
    </div>
    <div class="cell-break"></div>
    <div class="cell-break"></div>
    <div class="ltr">
      <button class="btn btn-primary" @click="addReceipt">إضافة فاتورة</button>
    </div>
  </div>
  <div v-else-if="isGettingData">
    <h2>Loading...</h2>
  </div>
  <div v-else>
    <h2>Not Found</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ContractModal from '../../model/Contract'

export default Vue.extend({
  inject: ['setReceiptAddMode'],
  computed: {
    id() {
      return this.$route.params.id
    },
    Attributes() {
      return ContractModal.Attributes
    },
    ...mapGetters('contracts', ['isGettingData', 'records', 'record', 'headersComplete']),
  },
  methods: {
    addReceipt() {
      this.setReceiptAddMode()
    },
  },
})
</script>
<style lang="scss" scoped>
.cell {
  &-container {
    display: flex;
    flex-flow: wrap;
    align-self: stretch;
  }
  &-title {
    flex: 0 0 20%;
    display: flex;
    align-items: center;
  }
  &-value {
    flex: 1 0 80%;
  }
  &-break {
    flex: 1 0 100%;
    height: 1px;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(to left, transparent 10%, gray 30%, gray 70%, transparent 90%);
  }

  display: inline-block;
  align-items: center;
  border-bottom: solid gray 1px;
}
</style>
