<template>
    <v-main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-xxl">
        <router-link class="navbar-brand" :to="{ name: 'Beranda' }">
          RESTORAN SEI SAPI
        </router-link>
      </div>
    </nav>

    <div class="container-fluid" style="margin-top: 75px; width:700px">
      <v-form v-model="valid" ref="form">
        <v-card persistent min-width="400px" elevation="8">
          <v-card-title class="backgroundhead">
            <span class="headline ml-2"><b>Order Di Sini !</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field v-model="form.name" label="Nama" disabled></v-text-field>
              <v-text-field v-model="form.no_telp" label="Nomor Telepon" disabled></v-text-field>
              <v-text-field v-model="form.alamat" label="Alamat" disabled></v-text-field>
              <v-select
                v-model="paket"
                :items="namaPaket"
                label="Paket Makanan"
                required
                @change="tampilHarga"
            ></v-select>
            <v-text-field v-model="form.hargaPaket" label="Harga" disabled ></v-text-field>
            <v-select
                v-model="promo"
                :items="namaPromo"
                label="Promo"
                required
                @change="tampilDiskon"
            ></v-select>
            <v-text-field v-model="form.diskonPromo" label="Diskon" disabled ></v-text-field>
            <v-text-field v-model="form.totalHarga" label="Total Harga" disabled ></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block color="#ce453d" class="text-white mb-2" @click="order"> ORDER </v-btn>
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

</style>

<script>
    export default {
        name: "OrderPesanan",
        data(){
            return{
                paket: null,
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                objPaket: new Array(),
                namaPaket: new Array(),
                hargaPaket: new Array(),
                objPromo: new Array(),
                namaPromo: new Array(),
                diskon: new Array(),
                pesanan: new FormData,
                form: {
                    name: null,
                    no_telp:null,
                    alamat: null,
                    namaPaket: null,
                    hargaPaket: null,
                    namaPromo: null,
                    diskonPromo: null,
                    totalHarga: null,
                    status: 0,
                },
            };
        },
        methods: {
            isiField() {
                this.form.name = localStorage.getItem("nama");
                this.form.no_telp = localStorage.getItem("notelp");
                this.form.alamat = localStorage.getItem("alamat");
            },
            readDataPaket() {
                var url = this.$api + '/paketmakan';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.objPaket = response.data.data;
                    this.isiNamaPaket(this.objPaket);
                });
            },
            readDataPromo() {
                var url = this.$api + '/promo';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.objPromo = response.data.data;
                    this.isiNamaPromo(this.objPromo);
                })
            },
            isiNamaPaket(objPaket){
                for(let i = 0; i<objPaket.length; i++){
                    this.namaPaket.push(objPaket[i].namaPaket);
                }
            },
            isiNamaPromo(objPromo){
                for(let i = 0; i<objPromo.length; i++){
                    this.namaPromo.push(objPromo[i].namaPromo);
                }
            },
            tampilHarga() {
                let i = this.namaPaket.indexOf(this.paket);
                this.form.namaPaket = this.paket;
                this.form.hargaPaket = this.objPaket[i].hargaPaket;
                this.hitungTotal();
            },
            tampilDiskon() {
                let i = this.namaPromo.indexOf(this.promo);
                this.form.namaPromo = this.promo;
                this.form.diskonPromo = this.objPromo[i].totalDiskon;
                this.hitungTotal();
            },
            hitungTotal() {
                this.form.totalHarga = this.form.hargaPaket - (this.form.hargaPaket * this.form.diskonPromo);
            },
            order() {
                this.pesanan.append('nama', this.form.name);
                this.pesanan.append('no_telp', this.form.no_telp);
                this.pesanan.append('alamat', this.form.alamat);
                if(this.paket == null) {
                    this.error_message = "Paket Makan Harus Di Isi";
                    this.color = "red";
                    this.snackbar = true;
                } else {
                    this.pesanan.append('paket', this.form.namaPaket);
                    this.pesanan.append('harga', this.form.hargaPaket);
                    if(this.promo == null) {
                        this.pesanan.append('promo', "-");
                    } else {
                        this.pesanan.append('promo', this.form.namaPromo);
                    }
                    this.pesanan.append('status', this.form.status);
                    this.pesanan.append('totalHarga', this.form.totalHarga);

                    var url = this.$api + '/pesanan'
                    this.load = true;
                    this.$http.post(url, this.pesanan, {
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.load = true;
                        alert('Pesanan Berhasil Dibuat');
                        this.resetForm();
                        this.$router.push({
                            name: "Beranda",
                        });
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
                }
                
            },
            resetForm() {
                this.form = {
                    name: null,
                    no_telp:null,
                    alamat: null,
                    namaPaket: null,
                    hargaPaket: null,
                    namaPromo: null,
                    diskonPromo: null,
                    totalHarga: null,
                    status: 0
                };
            },
        },
        mounted(){
            if(localStorage.getItem("token")==null){
                this.$router.push({
                    name: "Beranda",
                });
                alert("Login Terlebih Dahulu");
            } else {
                this.isiField();
                this.readDataPaket();
                this.readDataPromo();
            }
        },
    }
</script>