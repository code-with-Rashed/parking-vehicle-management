<script setup>
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import useVehicleCategoryApi from "../composables/vehicleCategoryApi";
const router = useRouter();
const { results, errors, statusCode, insert } = useVehicleCategoryApi();
const categoryForm = reactive({
  category_name: "",
  parking_charge: "",
  status: "",
});
const categoryFormHandler = async () => {
  await insert(categoryForm);
  if (statusCode.value == 201) {
    router.push({ name: "vehicle-category" });
  }
};
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Add Vehicle Category</h1>
          <RouterLink :to="{ name: 'vehicle-category' }">
            Vehicle Category List
          </RouterLink>
        </div>
        <div class="vehicle-form">
          <form @submit.prevent="categoryFormHandler">
            <div class="form-box">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
                maxlength="50"
                v-model.trim="categoryForm.category_name"
                autofocus
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
                v-model.number="categoryForm.parking_charge"
              />
            </div>
            <div class="form-box">
              <label for="status">Status</label>
              <select
                name="status"
                id="status"
                v-model="categoryForm.status"
                required
              >
                <option disabled value="">Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
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
