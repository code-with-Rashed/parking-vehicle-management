<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import useVehicleCategoryApi from "../composables/vehicleCategoryApi";
const popup = ref(false);
const deletedId = ref(0);
const { results, errors, statusCode, selectAll, destroy } =
  useVehicleCategoryApi();
onMounted(() => selectAll());
const openPopup = (id) => {
  popup.value = true;
  deletedId.value = id;
};
const deleteCategory = async (id) => {
  await destroy(id);
  popup.value = false;
  await selectAll();
};
watch(results, () => results.value.reverse());
const count = 0;
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Vehicle Category List</h1>
          <RouterLink :to="{ name: 'add-vehicle-category' }">
            Add New Category
          </RouterLink>
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
                <th>S.No</th>
                <th>Category Name</th>
                <th>Parking Charges</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, i) in results" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ result.category_name }}</td>
                <td>&#2547; {{ result.parking_charge }}</td>
                <td>
                  <a
                    href="javascript:void(0)"
                    class="active-btn oparation-btn"
                    v-if="result.status == 1"
                  >
                    Active
                  </a>
                  <a
                    href="javascript:void(0)"
                    class="inactive-btn oparation-btn"
                    v-if="result.status == 0"
                  >
                    Inactive
                  </a>
                </td>
                <td>
                  <RouterLink
                    :to="{
                      name: 'edit-vehicle-category',
                      params: { id: result.id },
                    }"
                    class="edit-btn oparation-btn"
                  >
                    <img src="../assets/image/edit.png" alt="edit" />
                  </RouterLink>
                  <a
                    href="javascript:void(0)"
                    class="delete-btn oparation-btn"
                    @click="openPopup(result.id)"
                  >
                    <img src="../assets/image/delete.png" alt="delete" />
                  </a>
                </td>
              </tr>
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
  <div class="popup" v-show="popup">
    <div class="popup-box">
      <p class="warning-message">
        Are you sure want to delete this vehicle category.
      </p>
      <div class="popup-close" @click="popup = !popup">&times;</div>
      <a
        href="javascript:void(0)"
        class="confirm-btn"
        @click="deleteCategory(deletedId)"
      >
        Confirm
      </a>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/vehicle-table-page.css";
@import "../assets/css/popup.css";
</style>
