<template>
  <div>
    <div class="card p-4 shadow m-4">
      <ContractCard />
    </div>
    <transition v-if="addReceiptVisible && record">
      <div class="card p-4 shadow m-4">
        <ReceiptAddForm />
      </div>
    </transition>
    <div class="card p-4 shadow m-4">
      <FileAttatchment />
    </div>
    <div class="card p-4 shadow m-4" v-if="records && record">
      <receipt-table />
    </div>
    <transition>
      <ReceiptModal v-if="popupIsOn" @request-close="closePopup">
        <template #body>
          <div class="d-flex justify-content-evenly mt-5">
            <button class="btn btn-lg btn-danger my-5" @click="deleteItem">نعم</button>
            <button class="btn btn-lg btn-outline-secondary my-5" @click="closePopup">لا</button>
          </div>
        </template>
      </ReceiptModal>
    </transition>
    <transition>
      <receipt-modal v-if="display" @request-close="closeDisplay" :msg="selectedReceipt">
        <template #body>
          <div v-if="isGettingFile">
            <h2>Loading File...</h2>
          </div>
          <iframe
            v-else-if="receiptFile"
            class="subframe"
            data-class="subframe"
            data-slug-hash="GCyhb"
            :src="receiptFile"
          />
          <div v-else>
            <h2>Error</h2>
          </div>
        </template>
      </receipt-modal>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ReceiptModal from '../components/Contracts/Modal'
import ContractCard from '../components/Contracts/Card'
import FileAttatchment from '../components/Contracts/AttatchmentViewer'
import ReceiptTable from '../components/Receipts/Table'
import ReceiptAddForm from '../components/Receipts/ReceiptsForm'
export default {
  data() {
    return {
      receiptFile: null,
      display: false,
      popupIsOn: false,
      receiptDeleteId: 0,
      selectedID: null,
      addReceiptVisible: false,
    }
  },
  provide() {
    return {
      openPopup: this.openPopup,
      closePopup: this.closePopup,
      openDisplay: this.openDisplay,
      closeDisplay: this.closeDisplay,
      selectId: this.selectId,
      addReceiptVisible: false,
      setReceiptAddMode: this.setReceiptAddMode,
      initPage: this.initPage,
    }
  },
  computed: {
    selectedReceipt() {
      let receipt = this.records.find(rec => rec.id == this.selectedID)
      return receipt.monthlySerial + ' فاتورة رقم'
    },

    id() {
      return this.$route.params.id
    },
    ...mapGetters('contracts', ['record', 'file']),
    ...mapGetters('receipts', ['records', 'isGettingFile']),
    ...mapGetters('receipts', { subFile: 'file' }),
  },
  methods: {
    setReceiptAddMode() {
      this.addReceiptVisible = !this.addReceiptVisible
    },
    selectId(id) {
      this.selectedID = id
    },
    cleanURL() {
      if (this.receiptFile) {
        this.receiptFile = URL.revokeObjectURL(this.subFile)
      }
    },
    openDisplay(receipt) {
      this.selectId(receipt.id)
      const fileId = receipt.ReceiptAttachments[0].id
      this.display = true
      this.downloadReceiptFile(fileId)
    },
    closeDisplay() {
      this.cleanURL()
      this.selectId(null)
      this.display = false
    },
    closePopup() {
      this.popupIsOn = false
    },
    openPopup() {
      this.popupIsOn = true
    },
    async deleteItem() {
      await this.$store.dispatch('receipts/deleteRecord', this.selectedID)
      this.closePopup()
      this.initPage()
    },
    initPage() {
      const id = this.$route.params.id
      this.$store.dispatch('contracts/downloadRecord', id)
      this.$store.dispatch('receipts/downloadRecords', id)
      this.resetData()
    },
    resetData() {
      this.receiptFile = null
      this.display = false
      this.popupIsOn = false
      this.receiptDeleteId = 0
      this.selectedID = null
      this.addReceiptVisible = false
    },
    async downloadReceiptFile(id) {
      await this.$store.dispatch('receipts/downloadFile', id)
      this.receiptFile = URL.createObjectURL(this.subFile)
    },
  },
  created() {
    this.initPage()
  },
  watch: {
    $route() {
      this.initPage()
    },
  },
  components: {
    ReceiptModal,
    ContractCard,
    FileAttatchment,
    ReceiptTable,
    ReceiptAddForm,
  },
}
</script>

<style lang="scss" scoped></style>
