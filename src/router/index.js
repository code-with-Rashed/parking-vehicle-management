import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../components/Login.vue"),
    meta: { title: "Login page" },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/Dashboard.vue"),
    meta: { title: "Dashboard page" },
  },
  {
    path: "/vehicle/category",
    name: "vehicle-category",
    component: () => import("../components/VehicleCategory.vue"),
    meta: { title: "Vehicle category list" },
  },
  {
    path: "/add/vehicle/category",
    name: "add-vehicle-category",
    component: () => import("../components/AddVehicleCategory.vue"),
    meta: { title: "Add new vehicle category" },
  },
  {
    path: "/edit/vehicle/category/:id(\\d+)",
    name: "edit-vehicle-category",
    component: () => import("../components/EditVehicleCategory.vue"),
    meta: { title: "Edit vehicle category" },
  },
  {
    path: "/incoming/vehicles",
    name: "incoming-vehicles",
    component: () => import("../components/IncomingVehicles.vue"),
    meta: { title: "Incomming vehicle list" },
  },
  {
    path: "/add/new/vehicle",
    name: "add-new-vehicle",
    component: () => import("../components/AddNewVehicle.vue"),
    meta: { title: "Add new vehicle" },
  },
  {
    path: "/edit/incoming/vehicle/:id(\\d+)",
    name: "edit-incoming-vehicle",
    component: () => import("../components/EditIncomingVehicle.vue"),
    meta: { title: "Edit vehicle information" },
  },
  {
    path: "/details/incoming/vehicle/:id(\\d+)",
    name: "details-incoming-vehicle",
    component: () => import("../components/DetailsIncomingVehicle.vue"),
    meta: { title: "Detail incomming vehicle information" },
  },
  {
    path: "/outgoing/vehicles",
    name: "outgoing-vehicles",
    component: () => import("../components/OutgoingVehicles.vue"),
    meta: { title: "Outgoing vehicle list" },
  },
  {
    path: "/details/outgoing/vehicle/:id(\\d+)",
    name: "details-outgoing-vehicle",
    component: () => import("../components/DetailsOutgoingVehicle.vue"),
    meta: { title: "Detail outgoing vehicle information" },
  },
  {
    path: "/search/report",
    name: "search-report",
    component: () => import("../components/SearchReport.vue"),
    meta: { title: "Search vehicle information" },
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("../components/Reports.vue"),
    meta: { title: "Search results" },
  },
  {
    path: "/profile/:id(\\d+)",
    name: "profile",
    component: () => import("../components/Profile.vue"),
    meta: { title: "Profile details" },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URI),
  routes: routes,
});
export default router;
