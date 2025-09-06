// Import default exports from individual API modules
import adminApi from "./adminApi";
import authApi from "./authApi";
import contractorApi from "./contractorApi";
import reportApi from "./reportApi";

// Named exports
export { adminApi, authApi, contractorApi, reportApi };

// Default export (all APIs together)
const api = { adminApi, authApi, contractorApi, reportApi };
export default api;
