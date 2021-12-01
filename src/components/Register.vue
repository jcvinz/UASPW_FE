<template>
    <v-main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-xxl"> 
            <a class="navbar-brand" href="">RESTORAN SEI SAPI</a>
        </div>
    </nav>

    <div class="container-fluid" style="margin-top: 150px; width:700px">
      <v-form v-model="valid" ref="form">
        <v-card persistent min-width="400px" elevation="8">
          <v-card-title class="backgroundhead">
            <span class="headline ml-2"><b>Register</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field v-model="name" label="Nama" :rules="nameRules" required></v-text-field>
              <v-text-field v-model="no_telp" label="Nomor Telepon" :rules="notelpRules" required></v-text-field>
              <v-text-field v-model="alamat" label="Alamat" :rules="alamatRules" required></v-text-field>
              <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
              <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password" required></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block color="#ce453d" class="text-white mb-2" @click="submit"> Register </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }} </v-snackbar>
    </v-main>
</template>

<style scoped>

.navbar {
  background-color: #ce453d !important;
  height: 80px;
}

.navbar-brand {
  color: white !important;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
}

.backgroundhead {
  background-color: #F0F1F2;
}

.headline {
    font-family: 'Montserrat', sans-serif !important;
    color:#2F4858;
}

</style>

<script>
export default {
  name: "Regsiter",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      name: "",
      nameRules: [(v) => !!v || "Nama Tidak Boleh Kosong !"],
      no_telp: "",
      notelpRules: [(v) => !!v || "No Telp Tidak Boleh Kosong !"],
      alamat: "",
      alamatRules: [(v) => !!v || "Alamat Tidak Boleh Kosong !"],
      email: "",
      emailRules: [(v) => !!v || "E-mail Tidak Boleh Kosong !"],
      password: "",
      passwordRules: [(v) => !!v || "Password Tidak Boleh Kosong !"],
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()){
        this.load = true;
        this.$http
          .post(this.$api + "/register", {
            name: this.name,
            no_telp: this.no_telp,
            alamat: this.alamat, 
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("token", response.data.access_token);
            this.clear();
            alert("Registrasi Berhasil !");
            this.$router.push({
              name: "Login",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>