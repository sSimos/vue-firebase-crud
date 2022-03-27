<template>
  <div class="container-sm">
    <UserBar />
    <TaskEdit />
  </div>
</template>

<script>
import TaskEdit from '@/components/TaskEdit.vue'
import UserBar from '@/components/UserBar.vue'

export default {
  name: 'Edit',
  components: { TaskEdit, UserBar }
}
</script>
