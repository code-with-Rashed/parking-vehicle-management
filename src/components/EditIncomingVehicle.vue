<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import useVehicleCategoryApi from "../composables/vehicleCategoryApi";
import useVehiclesApi from "../composables/vehiclesApi";

const { results: categores, selectAll } = useVehicleCategoryApi();
const { results: vehicleDetail, statusCode, select, update } = useVehiclesApi();
const { params } = useRoute();
const router = useRouter();
onMounted(async () => {
  await selectAll();
  await select(params.id);
});
const updateVehicle = async () => {
  await update(vehicleDetail.value, params.id);
  if (statusCode.value) {
    router.push({ name: "incoming-vehicles" });
  }
};
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Edit Incoming Vehicle</h1>
          <RouterLink :to="{ name: 'incoming-vehicles' }">
            Incoming Vehicle List
          </RouterLink>
        </div>
        <div class="vehicle-form">
          <form @submit.prevent="updateVehicle">
            <div class="form-box">
              <label for="vehicle-category">Vehicle Category</label>
              <select
                name="vehicle-category"
                id="vehicle-category"
                v-model="vehicleDetail.vehicle_category"
              >
                <template v-for="(category, i) in categores" :key="i">
                  <option
                    :value="category.id"
                    v-if="
                      category.status == 1 ||
                      category.id == vehicleDetail.vehicle_category
                    "
                  >
                    {{ category.category_name }}
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
                v-model.trim="vehicleDetail.vehicle_company"
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
                v-model.trim="vehicleDetail.registration_number"
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
                v-model.trim="vehicleDetail.owner_name"
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
                v-model.trim="vehicleDetail.owner_contact"
              />
            </div>
            <div class="form-submit-box">
              <input type="submit" value="Update" name="save" />
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
