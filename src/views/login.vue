<template>
  <main class="login">
    <header class="login__contenedor">
      <div class="login-header__contenido">
        <p>Prueba Front-end</p>
        <div class="d-flex justify-content-center mb-3">
          <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
        </div>
      </div>
      <div class="login__form-contenedor">
        <form @submit.prevent="login">
          <div class="form-campo">
            <input
              type="text"
              name="nombre"
              v-model="form.nombre"
              placeholder="Nombre"
              onkeypress="return check(event)">
          </div>
          <div class="form-campo">
            <input
              type="email"
              name="email"
              v-model="form.email"
              placeholder="Email">
          </div>
          <div class="form-campo">
            <input
              type="text"
              name="contraseña"
              v-model="form.password"
              placeholder="Contraseña">
          </div>
          <div class="form-campo">
            <input
              type="password"
              name="confirm"
              v-model="form.confirm_password"
              placeholder="Confirmar Contraseña">
          </div>
          <button
            class="btn-registro"
            type="submit">
            Registrar
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
        form: {
            nombre: '',
            password: '',
            email: '',
            confirm_password: ''
        },
        loginError: false,
        isEmpty: false,
        isLoading: false
      }
    },
    methods: {
      login() {
        if (this.isValidate()) {
          console.log('correcto');
          if (this.isValidatePassword() && this.form.password === this.form.confirm_password) {
            this.$bvToast.toast('Registro Exitoso de usuario',{
              title: 'Exito!',
              variant: 'success',
              solid: true
            })
            this.form.email = ''
            this.form.confirm_password = '',
            this.form.nombre = '',
            this.form.password = ''
            const baseURI = 'http://localhost:3000/tasks'
            axios.post(baseURI,{
              name: this.form.nombre,
              password: this.form.password,
              email: this.form.email
            }).then((result)=>{
              console.log(result);
            })
          } else {
            this.$bvToast.toast('La contraseña debe contener una mayuscula, un numero, un caracter especial o las contraseñas no son iguales',{
              title: 'Error',
              variant: 'warning',
              solid: true
            })
          }
        } else {
          this.$bvToast.toast('Datos Incompletos',{
            title: 'Mensaje',
            variant: 'warning',
            solid: true
          })
        }

        // if(this.input.username != "" && this.input.password != "") {
        //   this.isLoading = !this.isLoading
        //   const baseURI = 'http://localhost:3000/users/login'
        //   axios.post(baseURI,{
        //     username: this.input.username,
        //     password: this.input.password
        //   })
        //   .then((result)=>{
        //     if (result.data && result.data.user.length > 0 && this.isEqualData(result.data.user)) {
        //       this.$bvToast.toast('Datos Correctos',{
        //         title: 'Datos Correctos',
        //         variant: 'success',
        //         solid: true
        //       })
        //       this.isLoading = false
        //       localStorage.setItem('userData', result.data.user);
        //       // let cat = localStorage.getItem('userData');
        //       // console.log(cat)
        //       this.$router.replace({ name: "todolist" });
        //     } else {
        //       this.isLoading = false
        //       this.$bvToast.toast('Datos Incorrectos',{
        //         title: 'Datos Incorrectos',
        //         variant: 'danger',
        //         solid: true
        //       })
        //     }
        //   })
        // } else {
        //   this.$bvToast.toast('Username o Password incompletos', {
        //     title: 'Campos Incompletos',
        //     variant: 'warning',
        //     solid: true
        //   })
        // }
      },
      isEqualData(user) {
        return user[0].username === this.input.username && user[0].password === this.input.password;
      },
      isValidate() {
        if (this.form.nombre === '' || this.form.password === '' || this.form.email === '' || this.form.confirm_password === '') {
          return false;
        }
        return true;
      },
      isValidatePassword () {
        let pass = this.form.password;
        if (this.haveNumber(pass) && this.haveUpperCase(pass) && this.haveChar(pass)) {
          return true
        }
        return false
      },
      haveNumber(pass) {
        let numeros = '1234567890';
        for (let index = 0; index < pass.length; index++) {
          if (numeros.indexOf(pass.charAt(index),0)!=-1){
            console.log('tiene numeros');
           return true;
          }
        }
        return false
      },
      haveUpperCase (pass) {
        let letras_mayusculas='ABCDEFGHYJKLMNÑOPQRSTUVWXYZ';
        for (let i=0; i<pass.length; i++) {
          if (letras_mayusculas.indexOf(pass.charAt(i),0)!=-1) {
            return true;
          }
        }
        return false;
      },
      haveChar (pass) {
        let out = '';
        let filtro = '!"#$%&/()=?¡¨*_+{-.,><@}]:;¿';
      
        for (var i=0; i<pass.length; i++) {
          if (filtro.indexOf(pass.charAt(i)) != -1) {
            out += pass.charAt(i);
          }
        }
        if (out === '') {
          return false
        }
        return true;
      }
    }
  }
</script>
<style lang="scss">
  .login__contenedor {
    background-image: url('~@/assets/images/bg-login.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000,.6)
    }
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
      color: #fff;
      margin-top: 10px;
    }
  }

  .login__form-contenedor {
    background-color: #fff;
    position: relative;
    z-index: 50;
    padding: 40px 80px;
    border-radius: 6px;
    width: 490px;
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