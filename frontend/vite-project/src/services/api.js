const BASE_URL = "http://localhost:5000/api";

export const getDashboard = async (token, params) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${BASE_URL}/dashboard?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};