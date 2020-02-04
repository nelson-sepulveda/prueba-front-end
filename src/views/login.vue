<template>
  <main class="login">
    <header class="login__contenedor">
      <div class="login-header__contenido">
        <p>Prueba Front-end</p>
        <div class="d-flex justify-content-center mb-3">
          <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
        </div>
      </div>
      <div class="login__form">
        <form @submit.prevent="login">
          <div class="form-campo">
            <input
              type="text"
              name="username"
              v-model="input.username"
              placeholder="Username">
          </div>
          <div class="form-campo">
            <input
              type="password"
              name="password"
              v-model="input.password"
              placeholder="Password">
          </div>
          <button
            class="btn-registro"
            type="submit">
            Entrar
          </button>
          <div v-if="loginError"><p style="color: red; margin: 10px;">Usuario o contraseña inválido</p></div>
        </form>
      </div>
    </header>
  </main>
</template>
<script>
  import axios from 'axios'
  export default { 
    name: 'Login',
    data() {
      return {
        input: {
            username: "",
            password: ""
        },
        loginError: false,
        isEmpty: false,
        isLoading: false
      }
    },
    methods: {
      login() {
        if(this.input.username != "" && this.input.password != "") {
          this.isLoading = !this.isLoading
          const baseURI = 'http://localhost:3000/users/login'
          axios.post(baseURI,{
            username: this.input.username,
            password: this.input.password
          })
          .then((result)=>{
            if (result.data && result.data.user.length > 0 && this.isEqualData(result.data.user)) {
              this.$bvToast.toast('Datos Correctos',{
                title: 'Datos Correctos',
                variant: 'success',
                solid: true
              })
              this.isLoading = false
              localStorage.setItem('userData', result.data.user);
              // let cat = localStorage.getItem('userData');
              // console.log(cat)
              this.$router.replace({ name: "todolist" });
            } else {
              this.isLoading = false
              this.$bvToast.toast('Datos Incorrectos',{
                title: 'Datos Incorrectos',
                variant: 'danger',
                solid: true
              })
            }
          })
        } else {
          this.$bvToast.toast('Username o Password incompletos', {
            title: 'Campos Incompletos',
            variant: 'warning',
            solid: true
          })
        }
      },
      isEqualData(user) {
        return user[0].username === this.input.username && user[0].password === this.input.password;
      }
    }
  }
</script>
<style lang="scss">
  .login__contenedor {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    
  }

  .login-header__contenido {
    position: relative;
    z-index: 40;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      font-size: 24px;
      color: #000;
      margin-top: 10px;
    }
  }

  .login__form-contenedor {
    background-color: #fff;
    position: relative;
    z-index: 50;
    padding: 40px 80px;
    border-radius: 6px;
  }

  .form-campo {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    input {
      border: 1px solid #c1c1c1;
      padding: 10px;
      font-size: 18px;
      border-radius: 4px;
      &:focus{
        outline: none;
        border-color: #756fde;
      }
    }
  }

  .btn-registro {
    border-radius: 5px;
    background-image: linear-gradient(to bottom, #7620d6, #6e17e7);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px;
    width: 100%;
    border: none;
    font-size: 20px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      background-image: linear-gradient(to bottom,  #7620d6, #7b38d8);
    }
  }
</style>