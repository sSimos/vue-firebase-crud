<template>
  <div class="card card-body mt-8">
    <h3 class="text-center">
      <i @click="proceedToLogin" class="bi bi-arrow-left clickable"></i
      >&nbsp;Create your account
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
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="exampleCheck1"
          required
        />
        <label class="form-check-label" for="exampleCheck1"
          >I've read the
          <a
            href="https://www.privacypolicies.com/live/21796f96-a80f-4b7d-a0eb-b52e63916d00"
            >Privacy Policy</a
          ></label
        >
      </div>
      <div class="flex-between mt-1">
        <button type="submit" class="btn btn-primary">Register me!</button>
        <button @click="proceedToLogin" class="btn btn-secondary">Login</button>
      </div>
    </form>
  </div>
  <div v-if="showAlert" class="mt-3 alert alert-danger" role="alert">
    {{ alertMsg }}
  </div>
</template>

<script>
import { registerUser } from '@/firebase'
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
      let user_password = submit_elements.user_password.value
      let result = await registerUser(user_email, user_password)
      if (result[0]) router.push({ name: 'Login' })
      else {
        this.alertMsg = result[1]
        this.showAlert = true
      }
    },
    proceedToLogin() {
      router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
}
.clickable {
  cursor: pointer;
}
</style>
