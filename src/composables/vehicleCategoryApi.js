import { ref } from "vue";
import { API_URL } from "../../env";
export default function useVehicleCategoryApi() {
  const url = API_URL + "/vehicle_category/";
  const results = ref([]);
  const errors = ref(null);
  const statusCode = ref(null);
  const selectAll = async () => {
    results.value = [];
    errors.value = null;
    statusCode.value = null;
    try {
      const request = await fetch(url);
      const response = await request.json();
      results.value = response;
    } catch (error) {
      errors.value = error;
    }
  };
  const select = async (id) => {
    results.value = [];
    errors.value = null;
    try {
      const request = await fetch(url + id);
      const response = await request.json();
      results.value = response;
    } catch (error) {
      errors.value = error;
    }
  };
  const insert = async (data) => {
    results.value = [];
    errors.value = null;
    statusCode.value = null;
    try {
      const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      statusCode.value = request.status;
    } catch (error) {
      errors.value = error;
    }
  };
  const update = async (updatedData, id) => {
    results.value = [];
    errors.value = null;
    statusCode.value = null;
    try {
      const request = await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: { "Content-Type": "application/json" },
      });
      statusCode.value = request.status;
    } catch (error) {
      errors.value = error;
    }
  };
  const destroy = async (id) => {
    statusCode.value = null;
    errors.value = null;
    try {
      const request = await fetch(url + id, { method: "DELETE" });
      statusCode.value = request.status;
    } catch (error) {
      errors.value = error;
    }
  };
  return {
    results,
    errors,
    statusCode,
    selectAll,
    select,
    insert,
    update,
    destroy,
  };
}
