<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const searchCondition = reactive({
  formDate: "",
  toDate: "",
  type: "",
  vehicle_number: "",
  owner_name: "",
  owner_contact: "",
});
const searchReport = () => {
  router.push({
    name: "reports",
    query: searchCondition,
  });
};
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Search Reports</h1>
        </div>
        <div class="vehicle-form">
          <form @submit.prevent="searchReport">
            <div class="form-box">
              <label for="from-date">From Date</label>
              <input
                type="datetime-local"
                name="from-date"
                id="from-date"
                required
                v-model.trim="searchCondition.formDate"
              />
            </div>
            <div class="form-box">
              <label for="to-date">To Date</label>
              <input
                type="datetime-local"
                name="to-date"
                id="to-date"
                required
                v-model.trim="searchCondition.toDate"
              />
            </div>
            <div class="form-box">
              <label for="type">Type</label>
              <select
                name="type"
                id="type"
                v-model.trim="searchCondition.type"
                required
              >
                <option value="" disabled>Select a Type</option>
                <option value="all">All Records</option>
                <option value="incoming">Incoming Vehicle</option>
                <option value="outgoing">Outgoing Vehicle</option>
                <option value="vehicle_number">Search Vehicle Number</option>
                <option value="owner_name">Search Owner Name</option>
                <option value="owner_contact">Search Owner Phone Number</option>
              </select>
            </div>
            <div
              class="form-box"
              v-show="searchCondition.type == 'vehicle_number'"
            >
              <label for="vehicle_number">Vehicle Registration Number</label>
              <input
                type="text"
                name="vehicle_number"
                id="vehicle_number"
                maxlength="50"
                placeholder="Enter Vehicle Registration Number"
                :required="searchCondition.type == 'vehicle_number'"
                v-model.trim="searchCondition.vehicle_number"
              />
            </div>
            <div class="form-box" v-show="searchCondition.type == 'owner_name'">
              <label for="owner_name">Owner Name</label>
              <input
                type="text"
                name="owner_name"
                id="owner_name"
                maxlength="50"
                placeholder="Enter Owner Name"
                :required="searchCondition.type == 'owner_name'"
                v-model.trim="searchCondition.owner_name"
              />
            </div>
            <div
              class="form-box"
              v-show="searchCondition.type == 'owner_contact'"
            >
              <label for="owner_contact">Owner Phone Number</label>
              <input
                type="text"
                name="owner_contact"
                id="owner_contact"
                maxlength="12"
                placeholder="Enter Owner Phone Number"
                :required="searchCondition.type == 'owner_contact'"
                v-model.trim="searchCondition.owner_contact"
              />
            </div>
            <div class="form-submit-box">
              <input type="submit" value="Submit" name="save" />
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
