<template>
  <div>
    <div class="card shadow p-4 my-4 mx-3 rtl">
      <search-form></search-form>
    </div>
    <div class="card shadow p-4 my-4 mx-3 rtl">
      <app-table></app-table>
    </div>
    <transition>
      <receipt-modal v-if="popupIsOn" @request-close="closePopup">
        <template #body>
          <div class="d-flex justify-content-evenly mt-5">
            <button class="btn btn-lg btn-danger my-5" @click="deleteItem">نعم</button>
            <button class="btn btn-lg btn-outline-secondary my-5" @click="closePopup">لا</button>
          </div>
        </template>
      </receipt-modal>
    </transition>
  </div>
</template>

<script>
import searchForm from '../components/contracts/SearchForm'
import appTable from '../components/contracts/ContractsTableHead'
import ReceiptModal from '../components/contracts/TableModal'
export default {
  components: {
    // appTable,
    // searchForm,
    // ReceiptModal,
  },
  data() {
    return {
      popupIsOn: false,
    }
  },
  methods: {
    openPopup() {
      this.popupIsOn = true
    },
    async deleteItem() {
      await this.$store.dispatch('contracts/deleteRecord')
      this.closePopup()
    },
    closePopup() {
      this.popupIsOn = false
    },
  },
  provide() {
    return {
      openPop: this.openPopup,
      closePop: this.closePopup,
    }
  },
}
</script>

<style lang="scss"></style>
