<template>
    <v-main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-xxl"> 
        <router-link class="navbar-brand" :to="{ name: 'Beranda' }">
          RESTORAN SEI SAPI
        </router-link>
      </div>
    </nav>

    <div class="container-fluid" style="margin-top: 250px; width:450px">
      <v-form v-model="valid" ref="form">
        <v-card persistent min-width="400px" elevation="8">
          <v-card-title class="backgroundhead">
            <span class="headline ml-2"><b>Login</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
              <v-text-field label="Password" v-model="password" type="password" :rules="passwordRules" required></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="{ path: '/register' }" style="text-decoration: none">
              <v-btn class="mr-2 mb-2" color="#ce453d" text> Register </v-btn>
            </router-link>
            <v-btn color="#ce453d" class="text-white mb-2 mr-2" @click="login"> Login </v-btn>
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
    name: "Login",
    data() {
      return {
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        valid: false,
        password: '',
        passwordRules: [
          (v) => !!v || 'Password tidak boleh kosong !',
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail tidak boleh kosong !',
        ]
      };
    },
    methods: {
      login() {
        if(this.$refs.form.validate()){
          this.load = true;
          this.$http
            .post(this.$api + "/login", {
              email: this.email,
              password: this.password,
            })
            .then((response)=> {
              if(response.data.user.email_verified_at == null){
                this.error_message = "Verifikasi Email Terlebih Dahulu !";
                this.color = "red";
                this.snackbar = true;
                this.load = false;
              } else {
                this.error_message = response.data.message;
                this.load = false;
                localStorage.setItem("id", response.data.user.id);
                localStorage.setItem("token", response.data.access_token);
                if(this.email == "admin@gmail.com" && this.password == "admin"){
                  this.clear();
                  localStorage.setItem("user", "admin");
                  this.$router.push({
                    name: "Admin | Dashboard",
                  });
                } else {
                  this.clear();
                  localStorage.setItem("user", "user");
                  localStorage.setItem("nama", response.data.user.name);
                  localStorage.setItem("notelp", response.data.user.no_telp);
                  localStorage.setItem("alamat", response.data.user.alamat);
                  alert("Login Berhasil !");
                  this.$router.push({
                    name: "Beranda",
                  });
                }
              }
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
      clear(){
        this.$refs.form.reset();
      }
    }
  }
</script>