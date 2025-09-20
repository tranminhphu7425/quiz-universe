import axios from "axios";


const favoriteApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true, //// Cho phép gửi cookie nếu dùng Spring Security
});



export default favoriteApi;