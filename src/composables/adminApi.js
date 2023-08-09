import { ref } from "vue";
export default function useAdminApi() {
  const url = import.meta.env.VITE_API_URL + "/admin/";
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
      statusCode.value = request.status;
      results.value = response;
    } catch (error) {
      errors.value = error;
    }
  };
  const select = async (id) => {
    results.value = [];
    errors.value = null;
    statusCode.value = null;
    try {
      const request = await fetch(url + id);
      const response = await request.json();
      statusCode.value = request.status;
      results.value = response;
    } catch (error) {
      errors.value = error;
    }
  };
  const update = async (updatedData, id) => {
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
  const setStorage = (data) => {
    sessionStorage.setItem("adminCredential", JSON.stringify(data));
  };
  const getStorageData = () => {
    let data = sessionStorage.getItem("adminCredential");
    if (data) {
      return JSON.parse(data);
    } else {
      return { id: 0, name: "", isLogin: false };
    }
  };
  const logout = () => {
    sessionStorage.removeItem("adminCredential");
  };
  return {
    results,
    errors,
    statusCode,
    selectAll,
    select,
    update,
    setStorage,
    getStorageData,
    logout,
  };
}
