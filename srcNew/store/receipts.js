import Axios from '../axios/axios-server'
export default {
  namespaced: true,
  state() {
    return {
      receipts: null,
      receipt: null,
      receiptId: null,
      isGettingData: false,
      isDeletingData: false,
      selectedID: null,
      isUpdatingData: false,
      updateError: null,
    }
  },
  getters: {
    getUpdateError(state) {
      return state.updateError
    },
    getIsUpdatingData(state) {
      return state.isUpdatingData
    },
    getIsDeletingData(state) {
      return state.isDeletingData
    },
    getReceipts(state) {
      return state.receipts
    },
    getReceipt(state) {
      return state.receipt
    },
    getReceiptId(state) {
      return state.receiptId
    },
    isGettingData(state) {
      return state.isGettingData
    },
    selectedID(state) {
      return state.selectedID
    },
  },
  mutations: {
    setUpdateError(state, payload) {
      state.updateError = payload.updateError
    },
    setIsDeletingData(state, { loadingState = false }) {
      state.isDeletingData = loadingState
    },
    setIsUpdatingData(state, { loadingState = false }) {
      state.isUpdatingData = loadingState
    },
    setReceipts(state, payload) {
      state.receipts = payload.receipts
    },
    setReceipt(state, payload) {
      state.receipt = payload.receipt
    },
    setIsGettingData(state, { loadingState }) {
      state.isGettingData = loadingState
    },
    selectIdToDelete(state, { id }) {
      state.selectedID = id
    },
    removeRecordFromTable(state, { id }) {
      state.receipts = state.receipts.filter(rc => rc.id !== id)
    },
  },
  actions: {
    async downloadReceipt(context, payload) {
      context.commit('setIsGettingData', { loadingState: true })
      try {
        const res = await Axios.get('/receipts/get/' + payload.id)
        context.commit('setReceipt', { receipt: res.data })
      } catch (e) {
        console.log(e.message)
      } finally {
        context.commit('setIsGettingData', { loadingState: false })
      }
    },
    async addReceipt(context, payload) {
      context.commit('setIsGettingData', { loadingState: true })
      try {
        await Axios.post('/receipts/add', payload.formData)
      } catch (e) {
        console.log(e.message)
      } finally {
        context.commit('setIsGettingData', { loadingState: false })
      }
    },
    async downloadReceipts(context, payload) {
      context.commit('setIsGettingData', { loadingState: true })
      try {
        let res = await Axios.get('receipts/getAll/' + payload.id)
        context.commit('setReceipts', {
          receipts: res.data,
        })
      } catch (e) {
        console.log(e?.message)
      } finally {
        context.commit('setIsGettingData', { loadingState: true })
      }
    },
    async deleteRecord(context) {
      let id = context.getters.selectedID
      context.commit('setIsDeletingData', { loadingState: true })
      try {
        await Axios.delete('/receipts/' + id)
        context.commit('removeRecordFromTable', { id })
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('setIsDeletingData', { loadingState: false })
      }
    },
    async updateReceipt(context, payload) {
      let id = payload.id
      context.commit('setUpdateError', { updateError: null })
      context.commit('setIsUpdatingData', { loadingState: true })
      try {
        await Axios.patch('/receipts/' + id, { ...payload.updateParams })
      } catch (e) {
        context.commit('setUpdateError', { updateError: e.message })
        console.log(e)
      } finally {
        context.commit('setUpdateError', { updateError: null })
        context.commit('setIsUpdatingData', { loadingState: false })
      }
    },
  },
}
