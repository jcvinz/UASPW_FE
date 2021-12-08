import Vue from "vue";
import VueRouter from "vue-router";
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: importComponent("Home"),
            name: "Beranda",
            meta: { title: "Beranda" },
        },
        {
            path: "/login",
            component: importComponent("Login"),
            name: "Login",
            meta: { title: "Login" },
        },
        {
          path: "/register",
          component: importComponent("Register"),
          name: "Register",
          meta: { title: "Register" },
        },
        {
            path: "/profile",
            component: importComponent("Profile"),
            name: "Profile",
            meta: { title: "Profile" },
        },
        {
            path: "/editprofile",
            component: importComponent("EditProfile"),
            name: "EditProfile",
            meta: { title: "EditProfile" },
        },
        {
            path: "/orderpaket",
            component: importComponent("OrderPesanan"),
            name: "OrderPesanan",
            meta: { title: "OrderPesanan" },
        },
        {
            path: "/trackorder",
            component: importComponent("TrackOrder"),
            name: "TrackOrder",
            meta: { title: "TrackOrder" },
        },
        {
            path: "/dashboard",
            name: "Admin",
            meta: { title: "Admin" },
            component: importComponent("Admin/DashboardLayout"),
            children: [
                //Dashboard
                {
                    path: "/dashboard",
                    name: "Admin | Dashboard",
                    meta: { title: "Dashboard" },
                    component: importComponent("Admin/Dashboard"),
                },

                {
                    path: "/user",
                    name: "Admin | User",
                    meta: { title: "User" },
                    component: importComponent("Admin/User"),
                },

                {
                    path: "/pesanan",
                    name: "Admin | Pesanan",
                    meta: { title: "Pesanan" },
                    component: importComponent("Admin/Pesanan"),
                },

                {
                    path: "/promo",
                    name: "Admin | Promo",
                    meta: { title: "Promo" },
                    component: importComponent("Admin/Promo"),
                },

                {
                    path: "/paket",
                    name: "Admin | PaketMakan",
                    meta: { title: "Paket" },
                    component: importComponent("Admin/PaketMakan"),
                },
            ],
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("token") == null) {
                  next("Login");
                  document.to.meta.title = "Login";
                } else if (localStorage.getItem("user") != "admin") {
                  next("/");
                  document.to.meta.title = "Beranda";
                } else next();
              },
        },
        {
            path: "/cek/:email/:password/:date",
            component: importComponent("CekEmail"),
            name: "CekEmail",
            meta: { title: "CekEmail" },
        },
        {
            path: "*",
            name: "Not Found",
            component: importComponent("404"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;