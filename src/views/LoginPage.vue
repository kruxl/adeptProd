<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md5
      >
        <material-card
          color="green"
          title="Login"
          text="Enter your email and password below"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    class="purple-input"
                    label="Email Address"
                    v-model="form.email"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Password"
                    class="purple-input"
                    v-model="form.password"
                    />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="login"
                  >
                    Login
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
      return {
        form: {
          email: '',
          password: ''
        },
        error: null
      }
  },
  methods: {
      login: function() {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.form.email, this.form.password)
            .then(data => {
               this.$router.replace({ name : "Dashboard" });
            })
            .catch(err => {
               this.error = err.message;
            });
      }
  }
}
</script>
