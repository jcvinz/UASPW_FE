<template>
    <v-main>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-xxl"> 
                <router-link class="navbar-brand" :to="{ name: 'Beranda' }">
                RESTORAN SEI SAPI
                </router-link>
                <div class="collapse navbar-collapse justify-content-end"></div>
            </div>
        </nav>

        <div class="container-fluid" style="margin-top: 150px; width:700px">
        <v-form v-model="valid" ref="form">
            <v-card persistent min-width="400px" elevation="8">
            <v-card-title class="backgroundhead">
                <span class="headline ml-2"><b>Profile User</b></span>
            </v-card-title>
            
                <v-card-text>
                    <v-container class="ml-2">
                    <v-text-field v-model="form.name" label="Nama"></v-text-field>
                    <v-text-field v-model="form.no_telp" label="Nomor Telepon"></v-text-field>
                    <v-text-field v-model="form.alamat" label="Alamat"></v-text-field>
                    </v-container>
                </v-card-text>
            
            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ce453d" text @click="clear">CLEAR</v-btn>
                <v-btn color="#ce453d" class="text-white mr-3" @click="edit"> SUBMIT </v-btn>
            </v-card-actions>
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
            </v-card>
        </v-form>
        </div>
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

.nav-link {
  color: white !important;
  font-family: 'Montserrat', sans-serif;
}

</style>

<script>
    export default {
        name: "EditProfile",
        data(){
            return{
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                user: new FormData,
                form: {
                     name:null, 
                     no_telp: null, 
                     alamat: null,
                },
            };
        },
        methods: {
            isiField() {
                this.form.name = localStorage.getItem("nama");
                this.form.no_telp = localStorage.getItem("notelp");
                this.form.alamat = localStorage.getItem("alamat");
            },
            edit() {
                let newData= {
                    name : this.form.name,
                    no_telp : this.form.no_telp,
                    alamat : this.form.alamat
                };
                var url = this.$api + '/user/' + localStorage.getItem("id");
                this.load = true;
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem("token") 
                    }
                }).then(response =>{
                    this.error_message = response.data.message;
                    this.load = false;
                    localStorage.setItem("nama", this.form.name);
                    localStorage.setItem("notelp", this.form.no_telp);
                    localStorage.setItem("alamat", this.form.alamat);
                    alert('Edit Profile Berhasil !');
                    this.$router.push({
                        name: "Beranda",
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            clear() {
                this.form = {
                    name: null,
                    no_telp: null,
                    alamat: null
                };
            },
        },
        created(){
            this.isiField();
        },
    }
</script>