import Vue from "vue";
import VueRouter from "vue-router";

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