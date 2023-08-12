<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import useDateProccessing from "../composables/dateProccessing";
import useVehicleCategoryApi from "../composables/vehicleCategoryApi";
import useVehiclesApi from "../composables/vehiclesApi";
const { readableDate } = useDateProccessing();
const { results: category, select: selectedCategory } = useVehicleCategoryApi();
const { results: vehicleDetail, select: selectedVehicle } = useVehiclesApi();
const { params } = useRoute();
const status = ref(0);
onMounted(async () => {
  await selectedVehicle(params.id);
  await selectedCategory(vehicleDetail.value.vehicle_category);
  status.value = vehicleDetail.value.status;
});
</script>
<template>
  <div class="main-content" v-if="!status">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Details Outgoing Vehicle</h1>
          <RouterLink :to="{ name: 'outgoing-vehicles' }">
            Outgoing Vehicle List
          </RouterLink>
        </div>
        <div class="view-vehicle">
          <table>
            <tbody>
              <tr>
                <th>Parking Number</th>
                <td>{{ vehicleDetail.parking_number }}</td>
              </tr>
              <tr>
                <th>Vehicle Category</th>
                <td>{{ category.category_name }}</td>
              </tr>
              <tr>
                <th>Vehicle Company Name</th>
                <td>{{ vehicleDetail.vehicle_company }}</td>
              </tr>
              <tr>
                <th>Vehicle Registration Number</th>
                <td>{{ vehicleDetail.registration_number }}</td>
              </tr>
              <tr>
                <th>Owner Name</th>
                <td>{{ vehicleDetail.owner_name }}</td>
              </tr>
              <tr>
                <th>Owner Contact Number</th>
                <td>{{ vehicleDetail.owner_contact }}</td>
              </tr>
              <tr>
                <th>Vehicle In Time</th>
                <td>{{ readableDate(vehicleDetail.vehicle_intime) }}</td>
              </tr>
              <tr>
                <th>Vehicle Out Time</th>
                <td>{{ vehicleDetail.vehicle_outtime }}</td>
              </tr>
              <tr>
                <th>Parking Charges</th>
                <td>&#2547; {{ vehicleDetail.parking_charges }}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>Vehicle Out</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/details-vehicle-page.css";
</style>
