<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import useVehicleCategoryApi from "../composables/vehicleCategoryApi";
const { params } = useRoute();
const router = useRouter();
const { results, errors, statusCode, select, update } = useVehicleCategoryApi();
onMounted(async () => await select(params.id));
const updateVehicleCategory = async () => {
  await update(results.value, params.id);
  if (statusCode.value) {
    router.push({ name: "vehicle-category" });
  }
};
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Edit Vehicle Category</h1>
          <RouterLink :to="{ name: 'vehicle-category' }">
            Vehicle Category List
          </RouterLink>
        </div>
        <div class="vehicle-form">
          <form @submit.prevent="updateVehicleCategory">
            <div class="form-box">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
                maxlength="50"
                v-model.trim="results.category_name"
              />
            </div>
            <div class="form-box">
              <label for="charge">Parking Charges Per Hour</label>
              <input
                type="number"
                name="charge"
                id="charge"
                placeholder="Parking Charges Per Hour"
                required
                maxlength="10"
                v-model.trim="results.parking_charge"
              />
            </div>
            <div class="form-box">
              <label for="status">Status</label>
              <select id="status" v-model="results.status">
                <option value="1" :selected="results.status == 1">
                  Active
                </option>
                <option value="0" :selected="results.status == 0">
                  Inactive
                </option>
              </select>
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
<style>
@import "../assets/css/vehicle-form-page.css";
</style>
