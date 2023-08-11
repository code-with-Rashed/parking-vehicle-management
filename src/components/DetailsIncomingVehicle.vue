<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import useDateProccessing from "../composables/dateProccessing";
import useVehicleCategoryApi from "../composables/vehicleCategoryApi";
import useVehiclesApi from "../composables/vehiclesApi";
const router = useRouter();
const popup = ref(false);
const status = ref(0);
const { readableDate, outgoingDate, time, charges } = useDateProccessing();
const { params } = useRoute();
const { results: category, select: selectedCategory } = useVehicleCategoryApi();
const {
  results: vehicleDetail,
  select: selectedVehicle,
  update,
  statusCode,
} = useVehiclesApi();
onMounted(async () => {
  await selectedVehicle(params.id);
  await selectedCategory(vehicleDetail.value.vehicle_category);
  status.value = vehicleDetail.value.status;
});
const updateVehicles = async () => {
  await update(vehicleDetail.value, params.id);
  if (statusCode.value) {
    router.push({ name: "incoming-vehicles" });
  }
};
</script>
<template>
  <div class="main-content" v-if="status">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Details Incoming Vehicle</h1>
          <RouterLink :to="{ name: 'incoming-vehicles' }">
            Incoming Vehicle List
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
                <th>Per Hour Charges</th>
                <td>&#2547; {{ category.parking_charge }}</td>
              </tr>
              <tr>
                <th>Total Stay Time</th>
                <td>
                  {{ time.totalHour }} Hours {{ time.totalMinute }} Minutes.
                </td>
              </tr>
              <tr>
                <th>Parking Charges</th>
                <td>
                  &#2547;
                  {{
                    charges(
                      vehicleDetail.vehicle_intime,
                      category.parking_charge
                    )
                  }}
                </td>
              </tr>
              <tr>
                <th>Status</th>
                <td>Vehicle In</td>
              </tr>
            </tbody>
          </table>
          <div class="vehicle-update-btn">
            <button @click="popup = !popup">Update</button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-show="popup">
      <div class="popup-box">
        <form @submit.prevent="updateVehicles" method="post">
          <input
            type="hidden"
            name="status"
            :v-model="(vehicleDetail.status = 0)"
          />
          <input
            type="hidden"
            name="vehicle_outtime"
            :v-model="(vehicleDetail.vehicle_outtime = outgoingDate())"
          />
          <input
            type="hidden"
            name="parking_charges"
            :v-model="
              (vehicleDetail.parking_charges = charges(
                vehicleDetail.vehicle_intime,
                category.parking_charge
              ))
            "
          />
          <p>
            <strong>In Time : </strong>
            <small>{{ readableDate(vehicleDetail.vehicle_intime) }}</small>
          </p>
          <br />
          <p>
            <strong>Out Time : </strong>
            <small>{{ readableDate(outgoingDate()) }}</small>
          </p>
          <br />
          <p>
            <strong>Charges : </strong>
            <small>
              &#2547;
              {{
                charges(vehicleDetail.vehicle_intime, category.parking_charge)
              }}
            </small>
          </p>
          <br />
          <p>
            <strong>Status : </strong>
            <small>Outgoing Vehicle</small>
          </p>
          <input type="submit" value="Update" class="confirm-btn" />
        </form>
        <div class="popup-close" @click="popup = !popup">&times;</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/details-vehicle-page.css";
@import "../assets/css/popup.css";
</style>
