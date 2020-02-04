<template>
  <div id="app">
    <!-- Container Fluid -->
    <b-container fluid>
      <!-- <Header /> -->
      <!-- <router-link to="/foo">Go to Foo</router-link> -->
      <router-view/>
    </b-container>
    <!-- Container Fluid -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
  // import Header from '@/components/header/header.vue';

  export default {
    name: 'app',
    components: {
      // Header
    }
  }
</script>
<style>
</style>
