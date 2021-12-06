<template>
    <v-main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-xxl"> 
        <router-link class="navbar-brand" :to="{ name: 'Beranda' }">
          RESTORAN SEI SAPI
        </router-link>
      </div>
    </nav>

    <div class="container-fluid mt-10" style="width: 1300px">
        <div class="row justify-content-center">
            <v-card class="justify-content-center">
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                    </v-text-field>

                <v-spacer></v-spacer>
            </v-card-title>
            
            <v-data-table :headers="headers" :items="tempPesanan" :search="search">
            </v-data-table>
            </v-card>
        </div>
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

</style>

<script>
    export default {
        name: "TrackOrder",
        data() {
            return {
                search: null,
                headers: [
                    { text: "Nama", align:"start", sortable: true, value: "nama"},
                    { text: "Nomor Telepon", value: "no_telp"},
                    { text: "Alamat", value: "alamat"},
                    { text: "Paket", value: "paket"},
                    { text: "Harga", value: "harga"},
                    { text: "Promo", value: "promo"},
                    { text: "Status", value: "status" },
                    { text: "Total Harga", value: "totalHarga"},
                ],
                pesanan: new Array(),
                tempPesanan: new Array(),
            };
        },
        methods: {
            readData(){
                var url = this.$api +'/pesanan';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.pesanan = response.data.data;
                    this.bacaStatus(this.pesanan);
                })
            },
            bacaStatus(pesanan) {
                this.tempPesanan = pesanan;
                for (var i = 0; i < pesanan.length; i++) {

                    if(pesanan[i].status == 0){
                        this.tempPesanan[i].status = "Belum Ada Status";
                    } else if (pesanan[i].status == 1) {
                        this.tempPesanan[i].status = "Diproses";
                    } else if (pesanan[i].status == 2) {
                        this.tempPesanan[i].status = "Diantar";
                    } else if (pesanan[i].status == 3) {
                        this.tempPesanan[i].status = "Selesai";
                    }
                }
            },
        },
        mounted() {
            if(localStorage.getItem("token")==null){
                this.$router.push({
                    name: "Beranda",
                });
                alert("Login Terlebih Dahulu");
            } else {
                this.readData();
            }
        }
    }
</script>