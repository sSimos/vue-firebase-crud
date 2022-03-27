<template>
  <div class="container-sm">
    <div class="card card-body mt-8">
      <h3 class="text-center">
        <i @click="proceedToLogin" class="bi bi-arrow-left clickable"></i
        >&nbsp;Reset your password
      </h3>
      <form @submit.prevent="getFormValues">
        <div class="row">
          <div class="mb-3 mt-3 col-12">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              name="user_email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
        </div>
        <div class="flex-between mt-1">
          <button type="submit" class="btn btn-primary">Send email</button>
          <button @click="proceedToLogin" class="btn btn-secondary">
            Login
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAlert" class="mt-3 alert alert-danger" role="alert">
      {{ alertMsg }}
    </div>
  </div>
</template>

<script>
import { sendMailPasswordReset } from '@/firebase'
import router from '@/router'

export default {
  data() {
    return {
      showAlert: false,
      alertMsg: 'Error! Try again'
    }
  },
  methods: {
    async getFormValues(submitEvent) {
      let submit_elements = submitEvent.target.elements
      let user_email = submit_elements.user_email.value
      await sendMailPasswordReset(
        user_email,
        this.proceedToLogin,
        this.mailResetError
      )
      submit_elements.user_email.value = ''
    },
    mailResetError(error) {
      console.log(error)
      this.alertMsg = error.message
      this.showAlert = true
    },
    proceedToLogin() {
      router.push({ name: 'Login' })
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

.flex-between {
  display: flex;
  justify-content: space-between;
}

.clickable {
  cursor: pointer;
}
</style>
