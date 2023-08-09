<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import useVehiclesApi from "../composables/vehiclesApi";
const { selectAll, results, errors } = useVehiclesApi();
const router = useRouter();
const { query } = useRoute();
const type = query.type;
let finalResult = ref([]);
let filteredData = [];
const resultProccessing = (data) => {
  filteredData = [];
  for (let i = 0; i < data.length; i++) {
    if (
      new Date(query.formDate) / 1000 <=
        new Date(data[i].vehicle_intime) / 1000 &&
      new Date(query.toDate) / 1000 >= new Date(data[i].vehicle_intime) / 1000
    ) {
      switch (type) {
        case "all":
          filteredData.push(data[i]);
          break;
        case "incoming":
          if (data[i].status == 1) {
            filteredData.push(data[i]);
          }
          break;
        case "outgoing":
          if (data[i].status == 0) {
            filteredData.push(data[i]);
          }
          break;
        case "vehicle_number":
          if (query.vehicle_number == data[i].registration_number) {
            filteredData.push(data[i]);
          }
          break;
        case "owner_name":
          if (query.owner_name == data[i].owner_name) {
            filteredData.push(data[i]);
          }
          break;
        case "owner_contact":
          if (query.owner_contact == data[i].owner_contact) {
            filteredData.push(data[i]);
          }
          break;
        default:
          router.push({ name: "search-report" });
          break;
      }
    }
  }
  finalResult.value = filteredData;
};
onMounted(async () => {
  await selectAll();
  resultProccessing(results.value);
});
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Reports</h1>
        </div>
      </div>
    </div>
    <div class="content-box">
      <br />
      <div class="content-wrap">
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
                <th>Parking Number</th>
                <th>Owner Name</th>
                <th>Vehicle Reg Number</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="result in finalResult">
                <tr>
                  <td>{{ result.parking_number }}</td>
                  <td>{{ result.owner_name }}</td>
                  <td>{{ result.registration_number }}</td>
                  <td>
                    <a href="#" class="active-btn oparation-btn">Vehicle In</a>
                  </td>
                  <td>
                    <RouterLink
                      :to="{
                        name: 'details-incoming-vehicle',
                        params: { id: result.id },
                      }"
                      class="edit-btn oparation-btn"
                      v-if="result.status == 1"
                    >
                      <img src="../assets/image/eye.png" alt="details" />
                    </RouterLink>
                    <RouterLink
                      :to="{
                        name: 'details-outgoing-vehicle',
                        params: { id: result.id },
                      }"
                      class="edit-btn oparation-btn"
                      v-if="result.status == 0"
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
