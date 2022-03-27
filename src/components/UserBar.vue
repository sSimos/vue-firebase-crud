<template>
  <div class="card card-body mt-4 pt-2 pb-2 flex-separated">
    <strong>{{ mail }}</strong>
    <button @click="logout()" type="button" class="btn btn-secondary">
      Logout
    </button>
  </div>
</template>

<script>
import { authLogout, getMail, authCheckWithCallback } from '@/firebase'
import router from '@/router'

export default {
  data() {
    return {
      mail: ''
    }
  },
  mounted() {
    authCheckWithCallback(this.checkUserAndMailVerification)
  },
  methods: {
    setMail(user) {
      this.mail = user.email
    },
    logout() {
      console.log('logout')
      authLogout(
        () => {
          router.push({ name: 'Verification' })
        },
        error => {
          console.log(error.message)
        }
      )
    },
    checkUserAndMailVerification(user) {
      if (user != null) {
        if (!user.emailVerified) router.push({ name: 'Home' })
        else getMail(this.setMail)
      } else router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.flex-separated {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.flex-separated > button {
  width: fit-content;
}
</style>
