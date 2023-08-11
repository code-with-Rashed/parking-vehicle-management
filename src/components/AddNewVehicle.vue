<script setup>
import { onMounted, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import useVehicleCategoryApi from "../composables/vehicleCategoryApi";
import useVehiclesApi from "../composables/vehiclesApi";
const router = useRouter();
const { results, selectAll } = useVehicleCategoryApi();
onMounted(() => selectAll());

const { statusCode, insert } = useVehiclesApi();

function randomNumber() {
  let date = new Date();
  return (
    date.getFullYear() +
    date.getDate() +
    date.getHours() +
    date.getMinutes() +
    date.getSeconds() +
    date.getMilliseconds()
  );
}
const vehicleForm = reactive({
  parking_number: randomNumber(),
  vehicle_category: "",
  vehicle_company: "",
  registration_number: "",
  owner_name: "",
  owner_contact: "",
  vehicle_intime: "",
  vehicle_outtime: "",
  parking_charges: "",
  status: 1,
  id: "",
});
async function insertNewVehicle() {
  await insert(vehicleForm);
  if (statusCode.value == 201) {
    if (statusCode.value == 201) {
      router.push({ name: "incoming-vehicles" });
    }
  }
}
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Add New Vehicle</h1>
          <RouterLink :to="{ name: 'incoming-vehicles' }">
            Incoming Vehicle List
          </RouterLink>
        </div>
        <div class="vehicle-form">
          <form @submit.prevent="insertNewVehicle" id="vehicleForm">
            <div class="form-box">
              <label for="vehicle-category">Vehicle Category</label>
              <select
                name="vehicle-category"
                id="vehicle-category"
                v-model="vehicleForm.vehicle_category"
                required
              >
                <option disabled value="">Select Vehicle Category</option>
                <template v-for="(result, i) in results">
                  <option v-if="result.status == 1" :value="result.id">
                    {{ result.category_name }}
                  </option>
                </template>
              </select>
            </div>
            <div class="form-box">
              <label for="vehicle-company">Vehicle Company</label>
              <input
                type="text"
                name="vehicle-company"
                id="vehicle-company"
                placeholder="Vehicle Company"
                required
                maxlength="100"
                v-model.trim="vehicleForm.vehicle_company"
              />
            </div>
            <div class="form-box">
              <label for="registration-number">Registration Number</label>
              <input
                type="text"
                name="registration-number"
                id="registration-number"
                placeholder="Registration Number"
                required
                maxlength="15"
                v-model.trim="vehicleForm.registration_number"
              />
            </div>
            <div class="form-box">
              <label for="owner-name">Owner Name</label>
              <input
                type="text"
                name="owner-name"
                id="owner-name"
                placeholder="Owner Name"
                required
                maxlength="50"
                v-model.trim="vehicleForm.owner_name"
              />
            </div>
            <div class="form-box">
              <label for="owner-number">Owner Number</label>
              <input
                type="text"
                name="owner-number"
                id="owner-number"
                placeholder="Owner Number"
                required
                maxlength="12"
                v-model.trim="vehicleForm.owner_contact"
              />
            </div>
            <div class="form-box">
              <label for="vehicle-in-time">Vehicle In Time</label>
              <input
                type="datetime-local"
                name="vehicle-in-time"
                id="vehicle-in-time"
                required
                v-model="vehicleForm.vehicle_intime"
              />
            </div>
            <div class="form-submit-box">
              <input type="submit" value="Save" name="save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/vehicle-form-page.css";
</style>
