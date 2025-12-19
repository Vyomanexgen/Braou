const BASE_API = import.meta.env.VITE_BASE_API;

export const adminFetch = async (url, options = {}) => {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_API}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  return res;
};
