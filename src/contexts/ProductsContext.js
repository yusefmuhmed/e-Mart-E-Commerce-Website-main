"use client";

import { createContext, useEffect, useState, useContext, useRef } from "react";
import { Toaster } from "react-hot-toast";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [category, setCategory] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [gridView, setGridView] = useState(true);
  const [brands, setBrands] = useState([]);
  const [brandsCount, setBrandsCount] = useState(0);
  const [brand, setBrand] = useState([]);

  const productsVisible = useRef([]);
  const productsFiltered = useRef([]);

  if (!productsLoading) {
    productsFiltered.current = products
      .filter((p) => {
        if (category === "all") {
          return p;
        } else if (category === p.category) {
          return p;
        }
      })
      .filter((p1) => {
        if (brand.length === 0) {
          return p1;
        } else if (brand.includes(p1.brand)) {
          return p1;
        }
      });

    productsVisible.current = productsFiltered.current.slice(
      (pageNumber - 1) * 12,
      pageNumber * 12
    );

    // console.log(productsVisible.current);
  }

  useEffect(() => {
    (async () => {
      const res = await fetch("http://141.136.44.242:1337/api/products?populate=*", {
        headers: { Authorization: "Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f" }
      });
      const products = await res.json();
      const res2 =await fetch("http://141.136.44.242:1337/api/categories", {
        headers: { Authorization: "Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f" }
      });
      const categories = await res2.json();
      const res3 =await fetch("http://141.136.44.242:1337/api/brands", {
        headers: { Authorization: "Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f" }
      });
      const brands = await res3.json();
      
      setProducts([products.data]);
      setProductsCount(products.meta.pagination.total);
      setCategories([
        categories.data
      ]);
      setCategoriesCount(categories.meta.pagination.total);
      setBrands([brands.data]);
      setBrandsCount(brands.meta.pagination.total);
      setProductsLoading(false);
    })();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsCount,
        productsLoading,
        categories,
        categoriesCount,
        category,
        setCategory,
        pageNumber,
        setPageNumber,
        gridView,
        setGridView,
        productsVisible,
        brands,
        setBrands,
        brandsCount,
        setBrandsCount,
        brand,
        setBrand,
        productsFiltered,
      }}
    >
      {children}
      <Toaster position="top-center" />
    </ProductsContext.Provider>
  );
}
