import Axios from '../axios/axios-server'
import { Module } from 'vuex'
export const receiptStore: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      headers: ['monthlySerial', 'payment', 'percentage', 'enterDate'],
      records: null,
      record: null,
      file: null,

      isGettingData: false,
      isDeletingData: false,
      isUpdatingData: false,
      isCreatingData: false,
      isGettingFile: false,
    }
  },
  getters: {
    headers(state) {
      return state.headers
    },
    records(state) {
      return state.records
    },
    record(state) {
      return state.record
    },
    file(state) {
      return state.file
    },
    isGettingData(state) {
      return state.isGettingData
    },
    isDeletingData(state) {
      return state.isDeletingData
    },
    isUpdatingData(state) {
      return state.isUpdatingData
    },
    isCreatingData(state) {
      return state.isCreatingData
    },
    isGettingFile(state) {
      return state.isGettingFile
    },
  },
  mutations: {
    isGettingData(state, payload = false) {
      state.isGettingData = payload
    },
    isDeletingData(state, payload = false) {
      state.isDeletingData = payload
    },
    isUpdatingData(state, payload = false) {
      state.isUpdatingData = payload
    },
    isCreatingData(state, payload = false) {
      state.isCreatingData = payload
    },
    isGettingFile(state, payload = false) {
      state.isGettingFile = payload
    },
    file(state, payload) {
      //payload is blob
      state.file = payload
    },
    records(state, payload) {
      state.records = payload
    },
    record(state, payload) {
      state.record = payload
    },
    deleteRecord(state, id) {
      state.records = state.records.filter(record => record.id != id)
    },
    calculatePercentage(state, totalPayment) {
      const receipts = state.records
      receipts.forEach(receipt => {
        receipt.percentage = receipt.payment / totalPayment
      })
    },
  },
  actions: {
    addRecord(context, { newRecord, record }) {
      // const curRecords = context.getters.records
      // curRecords.push(newRecord)
      // context.commit('records', curRecords)
      // context.commit('calculatePercentage', record.payment)
    },
    async downloadRecord(context, id) {
      context.commit('isGettingData', true)
      try {
        const res = await Axios.get('/receipts/get/' + id)
        context.commit('record', res.data)
      } catch (e) {
        console.log(e.message)
      } finally {
        context.commit('isGettingData', false)
      }
    },
    async downloadFile(context, fileId) {
      context.commit('isGettingFile', true)
      try {
        const res = await Axios.get(`receipts/getFile/${fileId}`, {
          responseType: 'blob',
        })
        context.commit('file', res.data)
      } catch (e) {
        console.log(e.message)
      } finally {
        context.commit('isGettingFile', false)
      }
    },
    async createRecord(context, formData) {
      let callResponse: string
      context.commit('isCreatingData', true)
      try {
        await Axios.post('/receipts/add', formData)
        callResponse = 'ok'
      } catch (e) {
        callResponse = 'error'
        console.log(e.message)
      } finally {
        context.commit('isCreatingData', false)
      }
      return callResponse
    },
    async downloadRecords(context, contractId) {
      context.commit('isGettingData', true)
      try {
        const [contract, receipts] = await Promise.allSettled([
          Axios.get(`contracts/get/${contractId}`),
          Axios.get(`receipts/getAll/${contractId}`),
        ])

        context.commit('records', (<any>receipts).value.data)
        context.commit('calculatePercentage', +(<any>contract).value.data.payment)
      } catch (e) {
        console.log(e?.message)
      } finally {
        context.commit('isGettingData', false)
      }
    },
    async deleteRecord(context, id) {
      context.commit('isDeletingData', true)
      try {
        await Axios.delete('/receipts/' + id)
        context.commit('deleteRecord', id)
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('isDeletingData', false)
      }
    },
    async updateRecord(context, payload) {
      let id = payload.id
      let res: string
      context.commit('isUpdatingData', true)
      try {
        await Axios.patch('/receipts/' + id, { ...payload.updateParams })
        res = 'ok'
      } catch (e) {
        console.log(e)
        res = `error, {${e.message}}`
      } finally {
        context.commit('isUpdatingData', false)
      }
      return res
    },
  },
}
