import Vuex from 'vuex'
import Vue from 'vue'
import ContractsStore from './contracts'
import ReceiptsStore from './receipts'
Vue.use(Vuex)

const mystore = new Vuex.Store({
  modules: {
    contracts: ContractsStore, /// state, getters, mutations, actions
    receipts: ReceiptsStore, /// state, getters, mutations, actions
  },
})

export default mystore
