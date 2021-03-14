import api from '../axios/axios-server'
import router from '../router'
import { Module } from 'vuex'

export const UsersStore: Module<any, any> = {
  namespaced: true,
  state: {
    isLoggingIn: false,
    isLoggedIn: false,
    userInfo: {
      displayName: null,
    },
    accessToken: null,
    permissions: {
      canEdit: false,
      canDelete: false,
      canCreate: false,
    },
  },
  getters: {
    isLoggingIn(state) {
      return state.isLoggingIn
    },
    isLoggedIn(state) {
      return state.isLoggedIn
    },
    displayName(state) {
      return state.displayName
    },
    accessToken(state) {
      return state.accessToken
    },
    permissions(state) {
      return state.permissions
    },
    canEdit(state) {
      return state.permissions.canEdit
    },
    canDelete(state) {
      return state.permissions.canDelete
    },
    canCreate(state) {
      return state.permissions.canCreate
    },
  },
  mutations: {
    isLoggingIn(state, payload: boolean) {
      state.isLoggingIn = payload
    },
    isLoggedIn(state, payload: boolean) {
      state.isLoggedIn = payload
    },
    displayName(state, payload) {
      state.displayName = payload
    },
    accessToken(state, payload) {
      state.accessToken = payload
    },
    permissions(state, payload) {
      state.permissions = payload
    },
    canEdit(state, payload = false) {
      state.permissions.canEdit = payload
    },
    canDelete(state, payload = false) {
      state.permissions.canDelete = payload
    },
    canCreate(state, payload = false) {
      state.permissions.canCreate = payload
    },
  },

  actions: {
    async logIn({ commit, dispatch }, payload) {
      let res = undefined
      try {
        commit('isLoggingIn', true)
        const response = await api.post('/users/login', {
          name: payload.username,
          password: payload.password,
        })
        res = response
        commit('permissions', {
          canEdit: response.data.user.canEdit,
          canDelete: response.data.user.canDelete,
          canCreate: response.data.user.canCreate,
        })
        commit('displayName', response.data.user.titleAr)
        commit('accessToken', response.data.token)
        commit('isLoggedIn', true)

        api.defaults.headers = {
          Authorization: `Bearer ${response.data.token}`,
        }
        api.interceptors.response.use(null, err => {
          if (err.response.status === 401) {
            // reserved for 'jwt expired'
            dispatch('logOut')
            router.push({
              path: '/login-form',
              query: { redirect: router.currentRoute.path },
            })
          }
        })
      } catch (e) {
        res = e.message
      } finally {
        commit('isLoggingIn', false)
      }
      return res
    },
    logOut({ commit }) {
      api.post('/users/logout').catch(e => console.log(e.message))
      commit('isLoggedIn', false)
      commit('permissions', {
        canEdit: false,
        canDelete: false,
        canCreate: false,
      })
      commit('displayName', null)
      commit('accessToken', null)
    },
  },
}
