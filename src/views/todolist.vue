<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand> ToDo - List </b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text @click="$bvModal.show('bv-modal-register-post')"> Crear Post </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
     <b-modal
      id="bv-modal-register-post" 
      title="Registrar Post">
      <form>
        <div class="item__FormRegister">
          <label for="">Titulo</label>
          <input
            type="text"
            v-model="register.title"
            class="form-control input__RegisterForm">
        </div>
        <div class="item__FormRegister">
          <label for="">Estado</label>
          <b-form-select v-model="register.status" class="form-control  input__itemRegister" :options="options"></b-form-select>
        </div>
        <div class="item__FormRegister">
          <label for="">Contenido</label>
          <textarea
            type="email"
            v-model="register.content"
            class="form-control  input__itemRegister">
          </textarea>
        </div>
      </form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button
          size="sm"
          class="button-success-form-register"
          variant="outline-primary"
          @click="eventSubmitRegisterPost">
          Registrar
        </b-button>
        <b-button
          size="sm"
          variant="outline-danger"
          @click="cancel()">
          Cerrar
        </b-button>
      </template>
    </b-modal>
    <div class="mt-3">
      <b-card-group deck >
          <b-card
            v-for="(item) in posts"
            :key="item.id">
            <template v-slot:header>
              <p> {{ item.title }} </p>
            </template>
            <b-card-text>
              {{ item.content }}
            </b-card-text>
            <template v-slot:footer>
              <small class="text-muted">Estado: {{ item.status }} </small><br>
              <b-button
                variant="outline-danger"
                @click="eliminarPost(item)">
                Eliminar</b-button>
            </template>
          </b-card>
      </b-card-group>
    </div>
  </div>  
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      posts: [],
      register:{
        title: '',
        content: '',
        status: ''
      },
      options: [
        { value: 'Pendiente', text: 'Pendiente' },
        { value: 'En Proceso', text: 'En proceso' },
        { value: 'Realizado', text: 'Realizado' }        
      ]
    }
  },
  methods: {
    getPostMDB(){
      const baseURI = 'http://localhost:3000/todos/listTodo'
      axios.get(baseURI)
      .then((result)=>{
        this.posts = result.data.todos || []
      })
    },
    eliminarPost(item) {
      console.log(item);
      this.$bvModal.msgBoxConfirm('¿Deseas eliminar el post ' + item.title + '?', {
          title: 'Eliminacion de Post',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.deletePost(item)
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    deletePost(item) {
      const baseURI = 'http://localhost:3000/todos/dltTodo'
        axios.post(baseURI,{
          idTodo: item._id
        })
        .then((result)=>{
          console.log(result);
          if (result.data) {
            this.$bvToast.toast('Eliminacion Correcta',{
              title: 'Eliminacion',
              variant: 'success',
              solid: true
            })
            this.getPostMDB()
          } else {
            this.$bvToast.toast('Eliminacion Incorrecta',{
              title: 'Eliminacion',
              variant: 'danger',
              solid: true
            })
          }
        })
    },
    eventSubmitRegisterPost (){
      console.log(this.register);
      if (this.isValidData()) {
        let baseURI = 'http://localhost:3000/todos/addTodo'
        axios.post(baseURI,{
          title: this.register.title,
          content: this.register.content,
          status: this.register.status
        })
        .then((result)=>{
          console.log(result)
          if (result.data) {
            this.$bvToast.toast('Creacion Correcta de Post',{
              title: 'Creacion Correcta',
              variant: 'success',
              solid: true
            })
            this.getPostMDB()
            this.register.title = ''
            this.register.content = ''
            this.register.status = ''
             this.$bvModal.hide('bv-modal-register-post')
          } else {
            this.$bvToast.toast('Error en creacion de post',{
              title: 'Error en Creacion',
              variant: 'danger',
              solid: true
            })
          }
        })
      } else {
        this.$bvToast.toast('Datos incompletos',{
          title: 'Eliminacion',
          variant: 'warning',
          solid: true
        })
      }
    },
    isValidData(){
      return this.register.title !== '' && this.register.status !== '' && this.register.content !== '';
    }
  },
  created(){
    if (localStorage.getItem('userData')){
      this.getPostMDB();
    } else {
      this.$router.replace({ name: "login" });
    }

  }
}
</script>
<style lang="scss">
  .navbar-text{
    cursor: pointer;
  }

  .header__inicial{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    div{
      padding: 18px;
      margin-left: 12px;
    }
  }

  .header__ImgUser{
    img{
      border-radius: 50px;
      cursor: pointer;
    }
  }
  .header__Registro{
    cursor: pointer;
  }

  .item__FormRegister{
    display: flex;
    flex-flow: column wrap;
    margin-top: 25px;
    label{
      min-width: 150px;
      padding: 0;
      margin: 0;
      font-size: 15px;
      font-weight: initial;
    }
  }


  .modal-footer{
    justify-content: center;
    button{
      min-width: 120px;
    }
  }

  .modal-dialog {
    width: 420px;
  }

</style>