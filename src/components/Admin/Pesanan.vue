<template>
    <v-main>
        <h3 class="text-h3" font-wight-medium mb-5>Pesanan</h3>
        
        <v-card>
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
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card style="width: 600px">
                <v-card-title>
                    <span class="headline ml-2 mt-2">{{ formtitle }} Pesanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.nama" label="Nama" disabled></v-text-field>
                        <v-text-field v-model="form.no_telp" label="No Telp" disabled></v-text-field>
                        <v-text-field v-model="form.alamat" label="Alamat" disabled></v-text-field>
                        <v-text-field v-model="form.paket" label="Paket" disabled></v-text-field>
                        <v-text-field v-model="form.harga" label="Harga" disabled></v-text-field>
                        <v-text-field v-model="form.promo" label="Promo" disabled></v-text-field>
                        <v-select
                            v-model="status"
                            :items="namaStatus"
                            label="Status"
                            required
                            @change="getStatus"
                        ></v-select>
                        <!-- <v-text-field v-model="form.status" label="Status" required></v-text-field> -->
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn class="ml-5 mb-3" color="#ce453d" text @click="cancel">Cancel</v-btn>
                    <v-btn class="mb-3" color="#ce453d" text @click="update">Save</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="1000px">
            <v-card style="width: 600px">
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus pesanan ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn class="ml-2 mb-3" color="#ce453d" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn class="mb-3" color="#ce453d" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                search: null,
                dialog: false,
                dialogConfirm: false,
                namaStatus: ['Belum Ada Status', 'Diproses', 'Diantar', 'Selesai'],
                headers: [
                    { text: "Nama", align: "start", sortable: true, value: "nama" },
                    { text: "No Telp", value: 'no_telp' },
                    { text: "Alamat", value: 'alamat' },
                    { text: "Paket", value: 'paket' },
                    { text: "Harga", value: 'harga' },
                    { text: "Promo", value:'promo' },
                    { text: "Status", value:'status' },
                    { text: "Actions", value:'actions'},
                ],
                pesanan: new FormData,
                Pesanan: new Array(),
                tempPesanan: new Array(),
                tempStatus: null,
                form: {
                    name: null,
                    no_telp: null,
                    alamat: null,
                    paket: null,
                    harga: null,
                    promo: null,
                    status: null,
                },
                deleteId: '',
                editId: ''
            };
        },

        methods: {
            setForm(){
                if(this.inputType !== 'Tambah'){
                    this.update();
                }else{
                    this.save();
                }
            },
            //READ
            readData() {
                var url = this.$api + '/pesanan';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Pesanan = response.data.data;
                    this.bacaStatus(this.Pesanan);
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
            //SIMPAN
            save() {
                this.pesanan.append('name', this.form.name);
                this.pesanan.append('no_telp', this.form.no_telp);
                this.pesanan.append('alamat', this.form.alamat);
                this.pesanan.append('paket', this.form.paket);
                this.pesanan.append('harga', this.form.harga);
                this.pesanan.append('promo', this.form.promo);
                this.pesanan.append('status', this.form.status);

                var url = this.$api + '/pesanan/'
                this.load = true;
                this.$http.post(url, this.pesanan, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
            },
            //UPDATE
            update() {
                let newData = {
                    // name : this.form.name,
                    // no_telp : this.form.no_telp,
                    // alamat : this.form.alamat,
                    // paket : this.form.paket,
                    // harga : this.form.harga,
                    // promo : this.form.promo,
                    status : this.tempStatus,
                };
                var url = this.$api + '/pesanan/status/' + this.editId;
                this.load = true;
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
            },

            //HAPUS
            deleteData() {
                var url = this.$api + '/pesanan/' + this.deleteId;
                this.load = true;
                this.$http.delete(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
            },
            editHandler(item) {
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.form.name = item.name;
                this.form.no_telp = item.no_telp;
                this.form.alamat = item.alamat;
                this.form.paket = item.paket;
                this.form.harga = item.harga;
                this.form.promo = item.promo;
                this.status = item.status;
                this.dialog = true;
            },
            deleteHandler(id) {
                this.deleteId = id;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = 'Tambah';
                this.dialogConfirm = false;
                this.readData();
            },
            cancel() {
                this.readData();
                this.dialog = false;
                this.dialogConfirm = false;
            },
            resetForm() {
                this.form = {
                    name: null,
                    no_telp: null,
                    alamat: null,
                    paket: null,
                    harga: null,
                    promo: null,
                    status: null,
                };
            },
            getStatus(){
                if(this.status == "Belum Ada Status"){
                    this.tempStatus = 0;
                } else if(this.status == "Diproses"){
                    this.tempStatus = 1;
                } else if(this.status == "Diantar"){
                    this.tempStatus = 2;
                } else if(this.status == "Selesai"){
                    this.tempStatus = 3;
                }
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
        },
    };
</script>