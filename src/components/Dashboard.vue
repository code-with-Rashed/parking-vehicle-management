<script setup>
import { onMounted, ref } from "vue";
import useVehicleCategoryApi from "../composables/vehicleCategoryApi";
import useVehiclesApi from "../composables/vehiclesApi";

const { selectAll: allCategory, results: categoryResults } =
  useVehicleCategoryApi();
const { selectAll: allVehicle, results: vehicleResults } = useVehiclesApi();

onMounted(async () => {
  await allCategory();
  await allVehicle();
  countVehicleCategores(categoryResults.value);
  countVehicles(vehicleResults.value);
});

//Summary for vehicle category
const vehicleCategoryLength = ref(0);
function countVehicleCategores(categores) {
  for (let i = 0; i < categores.length; i++) {
    if (categores[i].status == 1) {
      vehicleCategoryLength.value++;
    }
  }
}
//----------------------

//Summary for  vehicles
const totalIncommingVehicles = ref(0);
const todayIncommingVehicles = ref(0);
const todayOutgoingVehicles = ref(0);
function countVehicles(vehicles) {
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].status == 1) {
      if (
        new Date(vehicles[i].vehicle_intime).getDate() == new Date().getDate()
      ) {
        todayIncommingVehicles.value++;
      }
    } else if (vehicles[i].status == 0) {
      if (
        new Date(vehicles[i].vehicle_outtime).getDate() == new Date().getDate()
      ) {
        todayOutgoingVehicles.value++;
      }
    }
    totalIncommingVehicles.value++;
  }
}
//-----------------------------------
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="overview-box">
          <div class="overview-card c1">
            <h5>Today Incoming Vehicle Entries</h5>
            <p>{{ todayIncommingVehicles }}</p>
          </div>
          <div class="overview-card c2">
            <h5>Today Outgoing Vehicle Entries</h5>
            <p>{{ todayOutgoingVehicles }}</p>
          </div>
          <div class="overview-card c3">
            <h5>Vehicle Categores</h5>
            <p>{{ vehicleCategoryLength }}</p>
          </div>
          <div class="overview-card c4">
            <h5>Total Incoming Vehicle</h5>
            <p>{{ totalIncommingVehicles }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/dashboard.css";
</style>
