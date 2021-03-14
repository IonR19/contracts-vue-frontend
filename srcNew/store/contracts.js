import Axios from '../axios/axios-server'
export default {
  namespaced: true,
  state() {
    return {
      records: [],
      record: null,
      file: null,
      //
      recordReceipts: null,
      isDownloadingData: false,
      isDownloadingFile: false,
      isSearchingData: false,
      isDeletingData: false,
      isUpdatingData: false,
      isCreatingData: false,
      isWaitingToDelete: false,
      selectedID: null,
    }
  },
  getters: {
    getRecord(state) {
      return state.record
    },
    getFile(state) {
      return state.file
    },
    isWaitingToDelete(state) {
      return state.isWaitingToDelete
    },
    getTableData(state) {
      return state.tableData
    },
    isDownloadingData(state) {
      return state.isGettingData
    },
    isUpdatingData(state) {
      return state.isUpdatingData
    },
    isGettingFile(state) {
      return state.isGettingFile
    },
    selectedID(state) {
      return state.selectedID
    },
  },
  mutations: {
    selectIdToDelete(state, { id }) {
      state.selectedID = id
    },
    setIsWaitingToDelete(state, { loadingState = false }) {
      state.isWaitingToDelete = loadingState
    },
    setFile(state, { file }) {
      //file is blob
      state.file = file
    },
    setRecord(state, payload) {
      state.record = payload.record
    },
    setRecords(state, payload) {
      state.records = payload.records
    },
    setIsDownloadingData(state, loading = false) {
      state.isGettingData = loading
    },
    setIsDownloadingFile(state, loading = false) {
      state.isGettingFile = loading
    },
    setIsSearchingData(state, loading = false) {
      state.isSearchingData = loading
    },
    setIsDeletingData(state, loading = false) {
      state.isDeletingData = loading;
    },
    setIsCreatingData(state, loading = false) {
      state.isCreatingData = loading
    },

    setTableData(state, payload) {
      state.isGettingData = false
      state.tableData = payload.data
      state.tableData.forEach(record => {
        record.ContractAttachments = record.ContractAttachments.length
      })
    },
  },
  actions: {
    beforeDelete({ commit }, { id }) {
      commit('selectIdToDelete', { id })
    },
    async updateRecord(context, payload) {
      context.commit('setLoadingState', { loadingState: true })
      try {
        await Axios.patch(`/contracts/${payload.id}`, payload)
        //updateRecord Locally too ??
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('setLoadingState', { loadingState: false })
      }
    },
    async downloadRecord(context, payload) {
      context.commit('setRecord', { record: null })
      context.commit('setLoadingState', { loadingState: true })
      try {
        let response = await Axios.get('/contracts/get/' + payload.id)
        context.commit('setRecord', { record: response.data })
      } catch (e) {
        console.log(e.message)
      } finally {
        context.commit('setLoadingState', { loadingState: false })
      }
    },
    async downloadRecords({ commit }) {
      commit('clearArray')
      try {
        let response = await Axios.get('contracts/getall')
        commit('setTableData', { data: response.data })
      } catch (err) {
        console.log(err)
      }
    },
    async searchRecords(context, payload) {
      try {
        context.commit('setLoadingState', { loadingState: true })
        let response = await Axios.get('contracts/search', {
          params: {
            ...payload,
          },
        })
        context.commit('setTableData', { data: response.data })
      } catch (error) {
        console.log(error)
      } finally {
        context.commit('setLoadingState', { loadingState: false })
      }
    },
    async deleteRecord(context) {
      let id = context.getters.selectedID
      context.commit('setIsWaitingToDelete', { loadingState: true })
      context.commit('removeRecordFromTable', { id })
      try {
        await Axios.delete('/contracts/' + id)
        context.commit('removeRecordFromTable', { id: context.getters.selectedID })
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('setIsWaitingToDelete', { loadingState: false })
      }
    },
    async downloadFile(context, payload) {
      context.commit('setFile', { file: null })
      context.commit('setIsGettingFile', { loadingState: true })
      try {
        let response = await Axios.get('/contracts/getFile/' + payload.id, {
          responseType: 'blob',
        })
        context.commit('setFile', { file: response.data })
      } catch (e) {
        console.log(e.message)
      } finally {
        context.commit('setIsGettingFile', { loadingState: false })
      }
    },
  },
}
