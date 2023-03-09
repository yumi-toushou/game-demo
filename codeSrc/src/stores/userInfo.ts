import { ref } from 'vue'
import { defineStore } from 'pinia'

async function apiLogin() {
  return {
    data: {
      token: "token",
      userInfo: {
        id: '',
        username: ''
      }
    }
  }
}

export const useUserStore = defineStore('userInfo', {
  state: () => {
    return {
      userInfo: {
        avatar: '',
        id: '',
        username: '',
        email: ''
      },
      token: ''
    }
  },
  getters: {
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
  },
  actions: {
    setToken(t: string) {
      if (t) {
        localStorage.setItem("token", t)
        this.$patch((state) => {
          state.token = t
        })
      }
    },

    clearToken() {
      localStorage.setItem("token", '')
      this.$patch((state) => {
        state.token = ''
      })
    },

    async login() {
      try {
        const response = await apiLogin()
        this.$patch(state => {
          state.userInfo = response?.data.userInfo
        })
        this.setToken(response.data.token)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async logout() {
      this.clearToken()
      this.$patch(state => {
        state.userInfo = {}
      })
    }
  }
})
