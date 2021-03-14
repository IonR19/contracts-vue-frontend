<template>
  <div>
    <div class="card shadow p-4 my-4 mx-3 rtl">
      <SearchForm></SearchForm>
    </div>
    <div class="card shadow p-4 my-4 mx-3 rtl">
      <AppTable></AppTable>
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
import SearchForm from '../components/Contracts/SearchForm'
import AppTable from '../components/Contracts/Table'
import ReceiptModal from '../components/Contracts/Modal'
export default {
  components: {
    AppTable,
    SearchForm,
    ReceiptModal,
  },
  data() {
    return {
      popupIsOn: false,
      selectedId: null,
    }
  },
  methods: {
    selectId(id) {
      this.selectedId = id
    },
    openPopup() {
      this.popupIsOn = true
    },
    async deleteItem() {
      await this.$store.dispatch('contracts/deleteRecord', this.selectedId)
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
      selectId: this.selectId,
    }
  },
}
</script>

<style lang="scss"></style>
