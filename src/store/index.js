import Vuex from 'vuex'
import Vue from 'vue'
import ContractsStore from './contracts.ts'
import { receiptStore } from './receipts.ts'
import { UsersStore } from './users.ts'
Vue.use(Vuex)

const mystore = new Vuex.Store({
  modules: {
    contracts: ContractsStore, /// state, getters, mutations, actions
    receipts: receiptStore, /// state, getters, mutations, actions
    users: UsersStore,
  },
})

export default mystore
