<template>
  <div class="card card-body mt-8">
    <h3 class="text-center">Log into your account</h3>
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
      <div class="row">
        <div class="mb-3 col-12">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            name="user_password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
      </div>
      <div class="flex-between mt-1">
        <button type="submit" class="btn btn-primary">Login</button>
        <button @click="proceedToRegistration" class="btn btn-secondary">
          Register
        </button>
      </div>
    </form>
  </div>
  <div v-if="showAlert" class="mt-3 alert alert-danger" role="alert">
    {{ alertMsg }}
  </div>
  <div class="mt-3 alert alert-info" role="alert">
    <a @click="resetPassword" href="#">Reset your password</a>
  </div>
</template>

<script>
import { loginUser, authCheckWithCallback } from '@/firebase'
import router from '@/router'

export default {
  data() {
    return {
      showAlert: false,
      alertMsg: 'Error! Try again'
    }
  },
  mounted() {
    authCheckWithCallback(this.checkUserAndMailVerification)
  },
  methods: {
    async getFormValues(submitEvent) {
      let submit_elements = submitEvent.target.elements
      let user_email = submit_elements.user_email.value
      let user_password = submit_elements.user_password.value
      loginUser(
        user_email,
        user_password,
        this.proceedToVerification,
        this.showError
      )
    },
    showError(error) {
      this.alertMsg = error.message
      this.showAlert = true
    },
    proceedToVerification(userCredential) {
      console.log(userCredential)
      router.push({ name: 'Verification' })
    },
    proceedToRegistration() {
      router.push({ name: 'Register' })
    },
    checkUserAndMailVerification(user) {
      if (user != null) {
        if (user.emailVerified) router.push({ name: 'Home' })
        else router.push({ name: 'Verification' })
      }
    },
    resetPassword() {
      router.push({ name: 'PasswordReset' })
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
</style>
