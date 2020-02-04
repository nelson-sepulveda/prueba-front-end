<template>
  <div class="home">    
    <h1>Home</h1>
    <button @click="fetchUsers()"> Click </button>
    <div>
      {{ post }}
    </div>
  </div>
</template>

<script>
  
  import axios from 'axios'

  export default {
    name: 'home',  
    data () {   
      return {      
        msg: 'Welcome to Your Vue.js App',
        post: []
      }
    },
    methods: {
      fetchUsers () {
        const baseURI = 'http://localhost:3000/todos/listTodo'
        axios.get(baseURI)
        .then((result)=>{
          console.log(result)
          this.post = result.data
        })
      }
    },
    created () {
      this.fetchUsers()
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
