<template>
  <div class="container-sm">
    <div class="card card-body mt-8">
      <h1 class="text-center">Verify your mail</h1>
      <h5 class="text-center mt-3">
        We've sent a mail to <br /><strong>{{ mail }}</strong>
      </h5>
      <div class="flex-separated mt-3">
        <button
          @click="sendAnotherMail()"
          type="button"
          class="btn btn-primary"
        >
          Send another email
        </button>
        <button @click="logout()" type="button" class="btn btn-secondary">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMail,
  authLogout,
  sendAnotherMail,
  authCheckWithCallback
} from '@/firebase'
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
    sendAnotherMail() {
      console.log('send another mail')
      let isSent = sendAnotherMail()
      console.log(isSent)
    },
    checkUserAndMailVerification(user) {
      if (user != null) {
        if (user.emailVerified) router.push({ name: 'Home' })
        else getMail(this.setMail)
      } else router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.container-sm {
  max-width: 500px !important;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
.flex-separated {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.flex-separated > button {
  width: fit-content;
}
</style>
