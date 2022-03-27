<template>
  <div class="card card-body mt-4">
    <h3>Save new task</h3>
    <form @submit.prevent="getFormValues">
      <div class="row">
        <div class="col-auto my-2">
          <label class="col-form-label">Time spent</label>
          <span id="passwordHelpInline" class="form-text"> (hours) </span>
          <input name="time" class="form-control" type="number" required />
        </div>
        <div class="col-auto my-2">
          <label class="col-form-label">Date</label>
          <input name="date" class="form-control" type="date" />
        </div>
        <div class="col-auto my-2 flex-grow-1">
          <label class="col-form-label">Task description</label>
          <textarea name="name" class="form-control" required />
        </div>
      </div>
      <div class="row align-items-center"></div>
      <button type="submit" class="btn btn-success mt-3">Save Task</button>
    </form>
  </div>
</template>

<script>
import { createTask, authCheckWithCallback, getMail } from '@/firebase'
import router from '@/router'

export default {
  data() {
    return {
      mail: ''
    }
  },
  mounted() {
    authCheckWithCallback(this.checkUserAndMailVerification)
    getMail(this.setMail)
  },
  methods: {
    async getFormValues(submitEvent) {
      let submit_elements = submitEvent.target.elements
      let form = {}
      // user could be null
      form.user = this.getUser()
      form.time = submit_elements.time.value
      form.date = submit_elements.date.value
      form.name = submit_elements.name.value
      await createTask({ ...form })
      submit_elements.time.value = ''
      submit_elements.name.value = ''
      submit_elements.date.value = ''
    },
    getUser() {
      return this.mail
    },
    setMail(user) {
      this.mail = user.email
    },
    checkUserAndMailVerification(user) {
      if (user != null) {
        if (!user.emailVerified) router.push({ name: 'Verification' })
      } else router.push({ name: 'Login' })
    }
  }
}
</script>
