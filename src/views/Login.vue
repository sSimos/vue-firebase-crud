<template>
  <div class="container-sm">
    <MailLogin />
  </div>
</template>

<script>
import MailLogin from '@/components/MailLogin.vue'

export default {
  name: 'Login',
  components: { MailLogin }
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
</style>
