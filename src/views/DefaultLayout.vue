<template>
  <layout>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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

<style lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity .2s linear
.fade-enter,
.fade-leave-to
  opacity: 0
</style>
