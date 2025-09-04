import adminApi from "./adminApi";
import authApi from "./authApi";
import contractorApi from "./contractorApi";
import reportApi from "./reportApi";

// ✅ Named exports
export { adminApi, authApi, contractorApi, reportApi };

// ✅ Default export (so you can import all APIs as a single object)
export default { adminApi, authApi, contractorApi, reportApi };
