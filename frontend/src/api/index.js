import adminApi from "./adminApi";
import authApi from "./authApi";
import contractorApi from "./contractorApi";
import reportApi from "./reportApi";

// named exports (so you can import specific APIs if you want)
export { adminApi, authApi, contractorApi, reportApi };

// default export (so you can do "import api from '../api'")
export default { adminApi, authApi, contractorApi, reportApi };
