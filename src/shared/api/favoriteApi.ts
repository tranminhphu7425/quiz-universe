import axios from "axios";


const favoriteApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true, //// Cho phép gửi cookie nếu dùng Spring Security
});



export async function fetchFavorites(userId: string | undefined, token: string) {
  const res = await fetch(`/api/subjects/favorites?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách yêu thích");
  }

  return res.json(); // trả về data dạng JSON
}



export default favoriteApi;