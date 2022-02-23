<template>
  <section style="height: 100%">
    <v-row class="form-section" style="height: 100%" align="center" no-gutters>
      <v-col cols="6" md="4">
        <div class="form">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="rules.email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              v-model="password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>

          <div>
            <v-btn @click="login" block>Logar</v-btn>
            <v-alert text dense type="info" class="mt-2">
              Email: user@email.com / Senha: password
            </v-alert>
          </div>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="8"
        style="height: 100%; background-color: #006df0"
        class="image-logo"
      >
        <div>
          <v-img
            style="transform: translateY(50%); margin: 0 auto"
            width="800"
            src="@/assets/Logo-Promobit-Azul.png"
          >
          </v-img>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      rules: {
        required: (value) => !!value || "Senha é obrigatória.",
        email: [
          (v) => !!v || "E-mail é obrigatório",
          (v) => /.+@.+\..+/.test(v) || "Insira um email válido",
        ],
      },
      valid: true,
    };
  },
  methods: {
    ...mapActions({
      authenticate: "auth/authenticate",
    }),
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      };

      this.authenticate(payload).then(() =>
        this.$router.push({ name: "dashboard@home" })
      );
    },
  },
};
</script>

<style scoped>
div.form {
  width: 80%;
  margin: 0 auto;
}

@media (max-width: 1199.98px) {
  .image-logo {
    display: none;
  }

  .form-section {
    justify-content: center;
  }
  .form-section > div {
    flex: 0 0 50%;
    max-width: 50.333333%;
  }
}

@media (max-width: 767.98px) {
  .form-section {
    align-items: start !important;
  }
  .form-section > div {
    margin-top: 30px;
    flex: 0 0 80%;
    max-width: 80.333333%;
  }
}
</style>
