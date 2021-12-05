<template>
<v-main>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-xxl">
        <router-link class="navbar-brand" :to="{ name: 'Beranda' }">
          RESTORAN SEI SAPI
        </router-link>
        <div
          class="collapse navbar-collapse justify-content-end"
        >
          <div class="navbar-nav">
            <a class="nav-link" href="#home">HOME</a>
            <a class="nav-link" href="#menu">MENU</a>
            <a class="nav-link" href="#about">ABOUT</a>
            <div v-if="cekLogin()=='guest'">
              <router-link class="nav-link" :to="{ path: '/login'}">
                {{txtLogin}}
              </router-link>
            </div>
            <div v-else-if="cekLogin()=='user'">
              <router-link class="nav-link" :to="{ path: '/profile'}">
                {{txtLogin}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid" id="home">
      <h1 id="taglineText">BEST SEI SAPI IN TOWN</h1>
      <div class="row justify-content-center">
        <img src="../assets/nyapiioutlet.jpg" alt="Gambar Beranda" style="width: 1000px" />
      </div>
    </div>

    <div class="container-fluid mt-10 mb-10" style="width: 1000px" id="menu">
      <h2 id="subJudul">Let's Take A Look<br>To Some Of Our Menu !</h2>
      <div class="row justify-content-center mb-5" >
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div class="row justify-content-center btn" style="width: 1000px">
            <router-link :to="{ name: 'OrderPesanan' }">
                <v-btn block color="#ce453d" class="text-white mr-3"> ORDER NOW </v-btn>
            </router-link>
        <v-btn block class="white--text" color="#ce453d" id="txtBtn">
          TRACK MY ORDER
        </v-btn>
      </div>
    </div>

    <div class="container-fluid" style="width: 1000px" id="about">
          <div class="row justify-content-center">
            <div class="row justify-content-center m-2" style="text-align: justify">
              <h2 id="subJudul">
                About Our Resto :
              </h2>
                <h4>
                  <p>
                    Our resto open since world war 2 ends. We only deviler the most
                    delicious Sapi to our customers.
                  </p>
                </h4>
                <h4>
                  <p>
                    The chef himself is a Sapi Master, so he knows what to do with
                    the ingredients the flavour always top notch.
                  </p>
                </h4>
                <h4>
                  <p>
                    We breed our Sapi by our own farm in secret area where only few
                    people can enter. We pick and cut the meat right in front of
                    their friends.
                  </p>
                </h4>
                <h4>
                  <p>
                    And we always open from 8 A.M to 11 P.M every Monday to
                    Saturday. On Sunday we milk our Sapi.
                  </p>
                </h4>
                <h6>
                  <p>
                    Email : SapiPerang@gmail.com | Phone : (021) 19181945 | Address
                    : Jl.Merdeka Raya No.45, Kota Rahasia, Indonesia
                  </p>
                </h6>
            </div>
          </div>
        </div>

    <footer class="text-center text-white" style="background-color: #ce453d">
          <!-- Grid container -->
          <div class="container p-4"></div>
          <!-- Grid container -->

          <!-- Copyright -->
          <div class="text-center p-3" style="background-color: #ce453d">
            © 2021 Copyright:
            <a class="text-white" href="#">Restoran Sei Sapi</a>
          </div>
          <!-- Copyright -->
    </footer>
</v-main>
</template>

<style scoped>

.navbar {
  background-color: #ce453d !important;
  height: 80px;
}

.nav-link {
  color: white !important;
  font-family: 'Montserrat', sans-serif;
}

.navbar-brand {
  color: white !important;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
}

h1 {
  color: #ce453d;
  font-weight: bold;
}

#txtBtn {
  font-family: 'Montserrat', sans-serif;
}

#taglineText {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  color: #ce453d;
  text-align: center;
  margin: 20px;
}

#subJudul {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  color: #ce453d;
  text-align: left;
  margin-bottom: 20px;
}
</style>

<script>
  export default {
    name: "Home",
    data () {
      return {
        txtLogin: "",
        items: [
          {
            src: 'https://s2.bukalapak.com/bukalapak-kontenz-production/content_attachments/64497/original/sei_sapi_jakarta.jpg',
          },
          {
            src: 'https://asset.kompas.com/crops/DXz8VuHdCJkniBVJv_YzdB2l6BE=/0x354:1440x1314/750x500/data/photo/2020/07/19/5f13ac00c83fb.jpg',
          },
          {
            src: 'https://asset.kompas.com/crops/fOa8dPafuFT1nLLaxOr9ZznYJWQ=/0x269:1440x1229/750x500/data/photo/2020/07/19/5f13ac00e9d8e.jpg',
          },
        ],
      }
    },
    methods: {
      cekLogin() {
        if (localStorage.getItem("token") == null) {
          this.txtLogin = "LOGIN";
          return 'guest';
        } else if (localStorage.getItem("token")!=null) {
          this.txtLogin = "Hi, " + localStorage.getItem("nama");
          return 'user';
        }
      },
    },
    created() {
      this.cekLogin();
    },
  };
</script>