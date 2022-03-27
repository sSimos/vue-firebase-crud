<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">User</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, date, time, user } in orderedTasks" :key="id">
          <td>{{ user }}</td>
          <td>{{ name }}</td>
          <td>{{ date }}</td>
          <td>{{ time }}</td>
          <td>
            <router-link :to="`/edit/${id}`">
              <button class="btn btn-primary btn-sm me-2">
                Edit
              </button>
            </router-link>
            <button class="btn btn-danger btn-sm" @click="deleteTask(id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLoadTasks, deleteTask } from '@/firebase'
import _ from 'lodash'

export default {
  // data() {
  //   return {
  //     tasks: []
  //   }
  // },
  setup() {
    const tasks = useLoadTasks()
    return { tasks, deleteTask }
  },
  computed: {
    orderedTasks: function() {
      return _.orderBy(this.tasks, 'date', 'desc')
    }
  }
}
</script>
