import axios from 'axios';

const instance = axios.create({ baseURL: '/api/v1/' });

instance.interceptors.request.use(config => {
  const token = localStorage.getItem("ginger_admin_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error))

instance.interceptors.response.use(
  res => res.data,
  error => {
    const { response } = error;
    if (response != undefined && response != null) {
      if (response.status == 401) {
        localStorage.removeItem("ginger_admin_token");
        if (window.location.pathname != "/admin/login") {
          window.location.pathname = "/admin/login";
        }
      }

      const { status, data } = response;

      let errMsg = "Something bad happened";

      if (data && data.message) {
        errMsg = data.message;
      } else if (status == 500) {
        errMsg = "Internal server error";
      } else if (status == 404) {
        errMsg = "404 Not Found";
      }

      window.$notifyError(errMsg);
    } else if (error.request) {
      window.$notifyError("Request sent but no response, is the server dead?")
    } else {
      window.$notifyError("Bad request");
    }

    return Promise.reject(error);
  }
);

export default instance;
