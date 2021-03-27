<template>
<v-container>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="15"
      label="Имя"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <!-- <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="Item"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select> -->

     <!-- <v-select
            v-model="value"
            :items="items"
            attach
            chips
            label="Группы"
            multiple
            readonly
            color="black"
    ></v-select> -->

    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
  </form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
  import { required,minLength, maxLength, email } from 'vuelidate/lib/validators';
// import { mapState } from 'vuex';

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(15),minLength: minLength(3) },
      email: { email },
    },

    data: () => ({
      name:'',
      email: '',
      select: null,
    }),

    computed: {
        

      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Не больше 15 символов')
        !this.$v.name.maxLength && errors.push('Не меньше 3 символов')
        !this.$v.name.required && errors.push('Имя необходимо.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Email необходим')
        return errors
      },
    },
    mounted(){
        this.name = this.$store.state.user.user.name;
        this.email = this.$store.state.user.email;
    },

    methods: {
      submit () {
        this.$v.$touch();
        this.$store.dispatch('changeName',this.name);
        this.$store.dispatch('changeEmail',this.email);
      },

    },
  }
</script>

<style>

</style>