import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePageView.vue";
import Orders from "../views/OrdersPageView.vue";
import BuyView from "../views/BuyView.vue";

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/Orders/:id",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/Buy",
    name: "Buy",
    component: BuyView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
