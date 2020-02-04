<template>
  <div class="header__inicial">
    <div>
      Inicio
    </div>
    <div>
      Nosotros
    </div>
    <div
      v-b-modal.modal-1 
      class="header__Registro">
      Registrate
    </div>
    <div class="header__ImgUser">
      <img
        src="https://placekitten.com/g/30/30"
        class="d-inline-block align-top"
        alt="Kitten">
    </div>
    <b-modal
      id="modal-1"
      title="Registrate!">
      <form>
        <div class="item__FormRegister">
          <label for="">Nombre</label>
          <input
            type="text"
            class="form-control input__RegisterForm">
        </div>
        <div class="item__FormRegister">
          <label for="">Email</label>
          <input
            type="email"
            class="form-control  input__itemRegister">
        </div>
        <div class="item__FormRegister">
          <label for="">Telefono</label>
          <input
            type="text"
            class="form-control  input__itemRegister">
        </div>
      </form>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button
          size="sm"
          class="button-success-form-register"
          variant="success"
          @click="eventSubmitRegister">
          OK
        </b-button>
        <b-button
          size="sm"
          variant="danger"
          @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="js" src="./header.js"></script>
<style src="./header.scss" lang="scss"></style>