<template>
  <layout>
    <router-view />
  </layout>
</template>

<script>
import Layout from '@/layouts/DefaultLayout'
export default {
  name: 'DefaultLayout',
  components: {
    Layout
  }
}
</script>
