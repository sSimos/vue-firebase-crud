<template>
  <div class="container-sm">
    <MailRegistration />
  </div>
</template>

<script>
import MailRegistration from '@/components/MailRegistration.vue'

export default {
  name: 'Register',
  components: { MailRegistration }
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
