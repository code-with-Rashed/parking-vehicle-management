<script setup>
import { onMounted, watch } from "vue";
import { RouterLink } from "vue-router";
import useVehiclesApi from "../composables/vehiclesApi";
const { results, errors, statusCode, selectAll } = useVehiclesApi();
onMounted(() => selectAll());
watch(results, () => results.value.reverse());
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Incoming Vehicle List</h1>
          <RouterLink :to="{ name: 'add-new-vehicle' }"
            >Add New Vehicle</RouterLink
          >
        </div>
        <div class="content-print-search">
          <button class="print-btn">Print</button>
          <input
            type="search"
            name="search"
            id="search"
            class="search-inp"
            placeholder="Search..."
          />
        </div>
        <div class="content-table">
          <table>
            <thead>
              <tr>
                <th>ID.No</th>
                <th>Parking No</th>
                <th>Owner Name</th>
                <th>Vehicle Reg Number</th>
                <th>Owner Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(result, i) in results" :key="i">
                <tr v-if="result.status == 1">
                  <td>{{ result.id }}</td>
                  <td>{{ result.parking_number }}</td>
                  <td>{{ result.owner_name }}</td>
                  <td>{{ result.registration_number }}</td>
                  <td>{{ result.owner_contact }}</td>
                  <td>
                    <a href="#" class="active-btn oparation-btn">Vehicle In</a>
                  </td>
                  <td>
                    <RouterLink
                      :to="{
                        name: 'edit-incoming-vehicle',
                        params: { id: result.id },
                      }"
                      class="edit-btn oparation-btn"
                    >
                      <img src="../assets/image/edit.png" alt="edit" />
                    </RouterLink>
                    <RouterLink
                      :to="{
                        name: 'details-incoming-vehicle',
                        params: { id: result.id },
                      }"
                      class="edit-btn oparation-btn"
                    >
                      <img src="../assets/image/eye.png" alt="details" />
                    </RouterLink>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="content-pagination">
          <span>Showing 1 to 2 of 2 entries</span>
          <span>
            <a href="" class="pagination-btn">
              <img
                src="../assets/image/left-arrow.png"
                alt="<"
                title="Previous Record"
              />
            </a>
            <a href="" class="pagination-btn">
              <img
                src="../assets/image/right-arrow.png"
                alt=">"
                title="Next Record"
              />
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/vehicle-table-page.css";
</style>
