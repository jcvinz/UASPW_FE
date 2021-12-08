<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>
            <v-list-item class="titlePart">
                <v-list-item-content>
                    <v-list-item-title class="title">ADMIN</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav class="sidePart">
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                tag="router-link"
                :to="item.to"
                >
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="63px" class="header">
            <v-app-bar-icon @click.stop="drawer = !drawer"></v-app-bar-icon>
            <VSpacer/>
            <v-toolbar-items>
                <v-btn text router @click="logout"><v-icon style="color: #ce453d;">mdi-power</v-icon></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            drawer: true,
            items: [
                { title: "Dashboard", to: "/dashboard" },
                { title: "Users", to: "/user" },
                { title: 'Pesanan', to: '/pesanan' },
                { title: 'Paket', to: '/paket' },
                { title: 'Promo', to: '/promo' },
            ],
        };
    },
    methods: {
        logout(){
            var url = this.$api + "/logout";
            this.load = true;
            this.$http
                .get(url, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) =>{
                    this.error_message = response.data.message;
                    this.load = false;
                    alert("Logout Berhasil !");
                    localStorage.removeItem("id");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    this.$router.push({
                        name: "Beranda",
                    });
                })
                .catch((error) => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
        },
    },
};
</script>
<style scoped>

.dashboard {
    font-family: 'Montserrat', sans-serif;
}
.fullheight {
    min-height: 100vh !important;
}
.header {
    background-color: #F5F5F5 !important;
    font-family: 'Montserrat', sans-serif;
}
.router{
    text-decoration: none;
    color: black;
}

.title {
    font-weight: bold;
    text-align: center;
}
</style>
