import Axios from '../axios/axios-server'
import { Module } from 'vuex'
export default {
  namespaced: true,
  state() {
    return {
      headers: ['contractNumber', 'contractName', 'company', 'percentage', 'payment'],
      headersComplete: [
        'contractNumber',
        'contractName',
        'company',
        'startDate',
        'endDate',
        'remainingDuration',
        'payment',
        'totalReceipts',
        'remainingPayment',
        'percentage',
      ],

      records: [],
      record: null,
      file: null,
      recordReceipts: null,
      //
      isGettingData: false,
      isGettingFile: false,
      isUpdatingData: false,
      isDeletingData: false,
      isCreatingData: false,
      //
    }
  },
  getters: {
    headers(state) {
      return state.headers
    },
    headersComplete(state) {
      return state.headersComplete
    },
    isGettingData(state) {
      return state.isGettingData
    },
    isGettingFile(state) {
      return state.isGettingFile
    },
    isUpdatingData(state) {
      return state.isUpdatingData
    },
    isDeletingData(state) {
      return state.isDeletingData
    },
    isCreatingData(state) {
      return state.isCreatingData
    },
    record(state) {
      return state.record
    },
    records(state) {
      return state.records
    },
    file(state) {
      return state.file
    },
    isWaitingToDelete(state) {
      return state.isWaitingToDelete
    },
  },
  mutations: {
    isGettingData(state, payload) {
      state.isGettingData = payload
    },
    isGettingFile(state, payload) {
      state.isGettingFile = payload
    },
    isUpdatingData(state, payload) {
      state.isUpdatingData = payload
    },
    isDeletingData(state, payload) {
      state.isDeletingData = payload
    },
    isCreatingData(state, payload) {
      state.isCreatingData = payload
    },
    file(state, file) {
      //file is blob
      state.file = file
    },
    record(state, payload) {
      if (payload) {
        payload.totalReceipts = payload.Receipts.length
        payload.remainingDuration = new Date(payload.endDate).toISOString()
        payload.remainingPayment = 0
        payload.percentage /= payload.payment
        payload.Receipts.forEach(receipt => {
          payload.remainingPayment += +receipt.payment
        })
      }
      state.record = payload
    },
    records(state, payload = null) {
      if (!payload) {
        return (state.records = null)
      }
      payload.forEach(record => {
        record.percentage /= +record.payment
      })
      state.records = payload
    },
    deleteRecord(state, id) {
      state.records = state.records.filter(record => record.id != id)
    },
  },
  actions: {
    async updateRecord(context, record) {
      context.commit('isUpdatingData', true)
      let res
      try {
        await Axios.patch(`/contracts/${record.id}`, record.param)
        res = 'ok'
      } catch (e) {
        console.log(e)
        res = 'error'
      } finally {
        context.commit('isUpdatingData', false)
      }
      return res
    },
    async downloadRecord(context, id) {
      context.commit('isGettingData', true)
      context.commit('record', null)
      let res
      try {
        let response = await Axios.get('/contracts/get/' + id)
        context.commit('record', response.data)
      } catch (e) {
        console.log(e.message)
        res = e.message
      } finally {
        context.commit('isGettingData', false)
      }
      return res
    },

    async downloadRecords({ commit }) {
      commit('isGettingData', true)
      commit('records', null)
      try {
        let response = await Axios.get('contracts/getall')
        commit('records', response.data)
      } catch (e) {
        console.log(e)
      } finally {
        commit('isGettingData', true)
      }
    },
    async searchRecords(context, params) {
      try {
        context.commit('isGettingData', true)
        let response = await Axios.get('contracts/search', {
          params: params,
        })
        context.commit('records', response.data)
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('isGettingData', false)
      }
    },
    async deleteRecord(context, id) {
      context.commit('isDeletingData', true)
      try {
        context.commit('deleteRecord', id)
        await Axios.delete(`/contracts/${id}`)
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('isDeletingData', false)
      }
    },
    async downloadFile(context, id) {
      context.commit('file', null)
      context.commit('isGettingFile', true)
      try {
        let response = await Axios.get('/contracts/getFile/' + id, {
          responseType: 'blob',
        })
        context.commit('file', response.data)
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('isGettingFile', false)
      }
    },
  },
} as Module<any, any>
