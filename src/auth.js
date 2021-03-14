import store from './store/index'

export default {
  authenticated() {
    // const permissions = store.getters['users/permissions']
    // const isLogged = store.getters['users/isLoggedIn'];
    return store.getters['users/isLoggedIn']
  },
  async logIn({ username, password }) {
    await store.dispatch('users/logIn', { username, password })
  },
  logOut() {
    store.dispatch('users/logOut')
  },
}
