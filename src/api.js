import axios from "axios";
const VERCEL_BACKEND_URL = "https://magic-match-backend.vercel.app";

// 1. Base URL Set Karo (Ab har axios call mein yeh URL apne aap jud jaayega)
axios.defaults.baseURL = VERCEL_BACKEND_URL;

// 2. Credentials Set Karo (Cookies ke liye)
axios.defaults.withCredentials = true;

// Is file ko export karne ki zaroorat nahin hai, bas isse run karna hai
// Taki defaults set ho jaayein.
