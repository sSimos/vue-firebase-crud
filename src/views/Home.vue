<template>
  <div class="container-sm">
    <UserBar />
    <UserCreate />
    <UserList />
  </div>
</template>

<script>
import UserCreate from '@/components/UserCreate.vue'
import UserList from '@/components/UserList.vue'
import UserBar from '@/components/UserBar.vue'

export default {
  name: 'Home',
  components: { UserCreate, UserList, UserBar }
}
</script>
