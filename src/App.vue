<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Foot/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

export default {
  name: 'App',

  components: {
    Navbar,
    Foot
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  margin: 0;
  padding: 0;
    
}
</style>
