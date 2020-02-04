

export default {
  computed: {
    state() {
      return this.name.length >= 4 ? true : false
    },
    invalidFeedback() {
      if (this.name.length > 4) {
        return ''
      } else if (this.name.length > 0) {
        return 'Enter at least 4 characters'
      } else {
        return 'Please enter something'
      }
    },
    validFeedback() {
      return this.state === true ? 'Thank you' : ''
    }
  },
  data() {
    return {
      form:{
        name: '',
        email: '',
        cellphone: ''
      }
    }
  },
  methods:{
    eventSubmitRegister() {
      console.log('hello')
    }
  }
}