import axios from "axios";
// 1. Base URL Set Karo (Ab har axios call mein yeh URL apne aap jud jaayega)
axios.defaults.baseURL=process.env.REACT_APP_BACKEND_URL;
// 2. Credentials Set Karo (Cookies ke liye)
axios.defaults.withCredentials = true;
// Is file ko export karne ki zaroorat nahin hai, bas isse run karna hai
// Taki defaults set ho jaayein.
