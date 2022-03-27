<template>
  <div class="card card-body mt-4">
    <h3>
      <i @click="goBack" class="bi bi-arrow-left clickable"></i>&nbsp;Edit task
    </h3>
    <form @submit.prevent="update">
      <div class="row">
        <div class="col-auto my-4">
          <label class="col-form-label">Created by</label>
          <input
            v-model="form.user"
            name="email"
            class="form-control"
            required
            disabled="disabled"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-auto my-2">
          <label class="col-form-label">Time spent</label>
          <span id="passwordHelpInline" class="form-text"> (hours) </span>
          <input
            v-model="form.time"
            name="time"
            class="form-control"
            type="number"
            required
          />
        </div>
        <div class="col-auto my-2">
          <label class="col-form-label">Date</label>
          <input
            v-model="form.date"
            name="date"
            class="form-control"
            type="date"
          />
        </div>
        <div class="col-auto my-2 flex-grow-1">
          <label class="col-form-label">Task description</label>
          <textarea
            v-model="form.name"
            name="name"
            class="form-control"
            required
          />
        </div>
      </div>
      <div class="row align-items-center"></div>
      <div class="flex-between">
        <button type="submit" class="btn btn-success mt-3">Save Task</button>
        <button @click="goBack" type="submit" class="btn btn-secondary mt-3">
          Go Back
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTask, updateTask } from '@/firebase'
import router from '@/router'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userId = computed(() => route.params.id)
    const form = reactive({ name: '', email: '' })
    onMounted(async () => {
      const user = await getTask(userId.value)
      // console.log(user, userId.value)
      form.name = user.name
      form.date = user.date
      form.time = user.time
      form.user = user.user
    })
    const update = async () => {
      await updateTask(userId.value, { ...form })
      router.push('/')
      form.name = ''
      form.user = ''
      form.time = ''
      form.date = ''
    }
    return { form, update }
  },
  methods: {
    goBack() {
      router.push({ name: 'Home' })
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
