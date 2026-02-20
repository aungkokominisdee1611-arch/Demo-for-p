const productsBase = "http://10.201.234.129:8080/api";

export const ServiceUrl = {
  products: productsBase + "/products",
  create: productsBase + "/products/create",
  edit: productsBase + "/products/update",
  delete: productsBase + "/products/delete",
  category: productsBase + "/categories",
  cc: productsBase + "/categories/create",
};
