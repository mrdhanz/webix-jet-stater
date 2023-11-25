import ajax from "../utils/ajax";

function status() {
  let user = webix.storage.local.get(import.meta.env.VITE_USER);
  if (user && user.token) return webix.promise.resolve(user);
  return webix.promise.reject(null).fail(function (error) {
    resolve(null);
  });
}

function login(user, pass) {
  return ajax.ajax.post(
    `${import.meta.env.VITE_SERVER}/auth/login`,
    { username: user, password: pass, expiresInMins: 60 },
    function (text, data, xhr) {
      webix.storage.local.put(import.meta.env.VITE_USER, data.json());
      return webix.promise.resolve(data.json());
    }
  );
}

function logout() {
  return new webix.promise((resolve, reject) => {
    webix.storage.local.remove(import.meta.env.VITE_USER);
    resolve(null);
  });
}
var getUser = () => webix.storage.local.get(import.meta.env.VITE_USER);
export default {
  status,
  login,
  logout,
  getUser,
};
