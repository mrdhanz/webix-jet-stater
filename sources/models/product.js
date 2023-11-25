import ajax from "../utils/ajax";

function getProducts(limit = 10, skip = 1) {
  return ajax.ajax.get(
    `${import.meta.env.VITE_SERVER}/products?limit=${limit}&skip=${skip}&select=title,brand,category,price,rating,stock`,
    (text, data, xhr) => {
      return webix.promise.resolve(data.json());
    }
  );
}

export {
    getProducts
}
